import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategoryBySlug } from "@/data/forumCategories";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Post = {
  id: string;
  thread_id: string;
  author_id: string;
  body: string;
  created_at: string;
};

type Comment = {
  id: string;
  post_id: string;
  author_id: string;
  body: string;
  created_at: string;
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString();
};

const shortAuthor = (id: string) => `member · ${id.slice(0, 6)}`;

const ForumCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const { toast } = useToast();

  const [postsByThread, setPostsByThread] = useState<Record<string, Post[]>>({});
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>({});
  const [loading, setLoading] = useState(true);

  const threadIds = useMemo(() => category?.threads.map((t) => t.id) ?? [], [category]);

  useEffect(() => {
    if (threadIds.length === 0) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const { data: posts, error: postsErr } = await supabase
        .from("forum_posts")
        .select("*")
        .in("thread_id", threadIds)
        .order("created_at", { ascending: false });

      if (postsErr) {
        toast({ title: "Couldn't load posts", description: postsErr.message, variant: "destructive" });
        if (!cancelled) setLoading(false);
        return;
      }

      const grouped: Record<string, Post[]> = {};
      (posts ?? []).forEach((p) => {
        (grouped[p.thread_id] ||= []).push(p);
      });

      const postIds = (posts ?? []).map((p) => p.id);
      let commentMap: Record<string, Comment[]> = {};
      if (postIds.length > 0) {
        const { data: comments, error: cErr } = await supabase
          .from("forum_comments")
          .select("*")
          .in("post_id", postIds)
          .order("created_at", { ascending: true });
        if (cErr) {
          toast({ title: "Couldn't load replies", description: cErr.message, variant: "destructive" });
        } else {
          (comments ?? []).forEach((c) => {
            (commentMap[c.post_id] ||= []).push(c);
          });
        }
      }

      if (!cancelled) {
        setPostsByThread(grouped);
        setCommentsByPost(commentMap);
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [threadIds, toast]);

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-background">
      <Header />
      <main className="flex-1 px-5 py-6 space-y-6">
        <Link
          to="/forums"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={16} />
          All categories
        </Link>

        {!category ? (
          <div className="space-y-2">
            <h1 className="font-display text-xl font-semibold text-foreground">
              Category not found
            </h1>
            <p className="text-sm text-muted-foreground">
              This space doesn't exist yet. Head back to explore the others.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-primary" />
                <h1 className="font-display text-xl font-semibold text-foreground">
                  {category.name}
                </h1>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>

            <ul className="space-y-4">
              {category.threads.map((thread) => {
                const threadPosts = postsByThread[thread.id] ?? [];
                const replyCount = threadPosts.reduce(
                  (sum, p) => sum + (commentsByPost[p.id]?.length ?? 0),
                  threadPosts.length,
                );
                return (
                  <li key={thread.id}>
                    <article className="rounded-xl border border-border bg-card px-4 py-3 space-y-3">
                      <Link
                        to={`/forums/${category.slug}/${thread.id}`}
                        className="block group"
                      >
                        <h2 className="font-display text-sm font-semibold text-card-foreground leading-snug group-hover:text-primary transition-colors">
                          {thread.title}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {thread.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-[11px] text-muted-foreground">
                          <span>{thread.lastActivity}</span>
                          <span>
                            {loading ? "…" : `${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
                          </span>
                        </div>
                      </Link>

                      {threadPosts.length > 0 && (
                        <div className="space-y-3 pt-2 border-t border-border">
                          {threadPosts.map((post) => {
                            const postComments = commentsByPost[post.id] ?? [];
                            return (
                              <div key={post.id} className="space-y-2">
                                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                                  <span>{shortAuthor(post.author_id)}</span>
                                  <span>{formatTime(post.created_at)}</span>
                                </div>
                                <p className="text-xs text-card-foreground whitespace-pre-wrap leading-relaxed">
                                  {post.body}
                                </p>
                                {postComments.length > 0 && (
                                  <ul className="space-y-2 border-l-2 border-border pl-3">
                                    {postComments.map((c) => (
                                      <li key={c.id} className="space-y-1">
                                        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                                          <span>{shortAuthor(c.author_id)}</span>
                                          <span>{formatTime(c.created_at)}</span>
                                        </div>
                                        <p className="text-xs text-card-foreground whitespace-pre-wrap leading-relaxed">
                                          {c.body}
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <Link
                        to={`/forums/${category.slug}/${thread.id}`}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        Open thread to reply
                        <ChevronRight size={12} />
                      </Link>
                    </article>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ForumCategory;
