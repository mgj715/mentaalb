import { FormEvent, useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FORUM_CATEGORY_GROUPS, type ForumThread as ThreadMeta } from "@/data/forumCategories";
import { getMockPosts } from "@/data/mockThreadReplies";

type Post = {
  id: string;
  body: string;
  author_id: string;
  created_at: string;
};

type Comment = {
  id: string;
  post_id: string;
  body: string;
  author_id: string;
  created_at: string;
};

const findThread = (threadId: string): { thread: ThreadMeta; categorySlug: string; categoryName: string } | undefined => {
  for (const group of FORUM_CATEGORY_GROUPS) {
    for (const category of group.categories) {
      const thread = category.threads.find((t) => t.id === threadId);
      if (thread) return { thread, categorySlug: category.slug, categoryName: category.name };
    }
  }
  return undefined;
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

const ForumThread = () => {
  const { slug, threadId } = useParams<{ slug: string; threadId: string }>();
  const meta = threadId ? findThread(threadId) : undefined;
  const { user } = useAuth();
  const { toast } = useToast();

  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [submittingPost, setSubmittingPost] = useState(false);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [submittingComment, setSubmittingComment] = useState<string | null>(null);

  const loadThread = useCallback(async () => {
    if (!threadId) return;
    setLoading(true);
    const { data: postsData, error: postsErr } = await supabase
      .from("forum_posts")
      .select("*")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: false });

    if (postsErr) {
      toast({ title: "Couldn't load posts", description: postsErr.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    const postIds = (postsData ?? []).map((p) => p.id);
    let commentsData: Comment[] = [];
    if (postIds.length > 0) {
      const { data: c, error: cErr } = await supabase
        .from("forum_comments")
        .select("*")
        .in("post_id", postIds)
        .order("created_at", { ascending: true });
      if (cErr) {
        toast({ title: "Couldn't load comments", description: cErr.message, variant: "destructive" });
      } else {
        commentsData = c ?? [];
      }
    }

    setPosts(postsData ?? []);
    setComments(commentsData);
    setLoading(false);
  }, [threadId, toast]);

  useEffect(() => {
    loadThread();
  }, [loadThread]);

  const handleNewPost = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !threadId || !newPost.trim()) return;
    setSubmittingPost(true);
    const { error } = await supabase.from("forum_posts").insert({
      thread_id: threadId,
      author_id: user.id,
      body: newPost.trim(),
    });
    setSubmittingPost(false);
    if (error) {
      toast({ title: "Couldn't post", description: error.message, variant: "destructive" });
      return;
    }
    setNewPost("");
    loadThread();
  };

  const handleNewComment = async (postId: string) => {
    const draft = commentDrafts[postId]?.trim();
    if (!user || !draft) return;
    setSubmittingComment(postId);
    const { error } = await supabase.from("forum_comments").insert({
      post_id: postId,
      author_id: user.id,
      body: draft,
    });
    setSubmittingComment(null);
    if (error) {
      toast({ title: "Couldn't reply", description: error.message, variant: "destructive" });
      return;
    }
    setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
    loadThread();
  };

  const authRedirect = `/auth?redirect=${encodeURIComponent(`/forums/${slug}/${threadId}`)}`;

  return (
    <div className="relative min-h-screen flex flex-col max-w-md mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-6">
        <Link
          to={slug ? `/forums/${slug}` : "/forums"}
          className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={16} />
          {meta ? meta.categoryName : "Back"}
        </Link>

        {!meta ? (
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold text-charcoal">Thread not found</h1>
            <p className="text-sm text-charcoal/70">This thread doesn't exist.</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-peach/40 text-charcoal">
                  <MessageSquare size={18} />
                </span>
                <h1 className="font-display text-2xl font-semibold text-charcoal leading-snug">
                  {meta.thread.title}
                </h1>
              </div>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                {meta.thread.excerpt}
              </p>
            </div>

            {/* New post composer or sign-in CTA */}
            {user ? (
              <form onSubmit={handleNewPost} className="space-y-2">
                <Textarea
                  placeholder="Share a thought, question, or reflection…"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                  maxLength={5000}
                />
                <Button
                  type="submit"
                  disabled={submittingPost || !newPost.trim()}
                  className="w-full"
                >
                  {submittingPost ? "Posting…" : "Post"}
                </Button>
              </form>
            ) : (
              <div className="rounded-xl border border-border bg-card px-4 py-3 space-y-2">
                <p className="text-sm text-card-foreground">
                  Sign in to share a post or reply.
                </p>
                <p className="text-xs text-muted-foreground">
                  Reading is open to everyone — contributing needs an account.
                </p>
                <Link to={authRedirect}>
                  <Button size="sm" className="w-full mt-1">
                    Sign in to contribute
                  </Button>
                </Link>
              </div>
            )}

            {/* Posts list */}
            <section className="space-y-4">
              {/* Mock community posts — always shown so threads feel populated */}
              {getMockPosts(meta.thread).map((mp) => (
                <article
                  key={mp.id}
                  className="rounded-xl border border-border bg-card px-4 py-3 space-y-3"
                >
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{mp.author}</span>
                    <span>{mp.createdLabel}</span>
                  </div>
                  <p className="text-sm text-card-foreground whitespace-pre-wrap leading-relaxed">
                    {mp.body}
                  </p>

                  {mp.comments.length > 0 && (
                    <ul className="space-y-2 border-l-2 border-border pl-3">
                      {mp.comments.map((c) => (
                        <li key={c.id} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                            <span>{c.author}</span>
                            <span>{c.createdLabel}</span>
                          </div>
                          <p className="text-xs text-card-foreground whitespace-pre-wrap leading-relaxed">
                            {c.body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!user && (
                    <Link
                      to={authRedirect}
                      className="inline-block text-xs text-primary hover:underline"
                    >
                      Sign in to reply
                    </Link>
                  )}
                </article>
              ))}

              {/* Real database posts */}
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : (
                posts.map((post) => {
                  const postComments = comments.filter((c) => c.post_id === post.id);
                  return (
                    <article
                      key={post.id}
                      className="rounded-xl border border-border bg-card px-4 py-3 space-y-3"
                    >
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{shortAuthor(post.author_id)}</span>
                        <span>{formatTime(post.created_at)}</span>
                      </div>
                      <p className="text-sm text-card-foreground whitespace-pre-wrap leading-relaxed">
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

                      {user ? (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Write a reply…"
                            rows={2}
                            maxLength={2000}
                            value={commentDrafts[post.id] ?? ""}
                            onChange={(e) =>
                              setCommentDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))
                            }
                          />
                          <Button
                            size="sm"
                            variant="secondary"
                            disabled={
                              submittingComment === post.id || !(commentDrafts[post.id]?.trim())
                            }
                            onClick={() => handleNewComment(post.id)}
                          >
                            {submittingComment === post.id ? "Replying…" : "Reply"}
                          </Button>
                        </div>
                      ) : (
                        <Link
                          to={authRedirect}
                          className="inline-block text-xs text-primary hover:underline"
                        >
                          Sign in to reply
                        </Link>
                      )}
                    </article>
                  );
                })
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ForumThread;
