import { Link } from "react-router-dom";
import { MessageSquare, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FORUM_THREADS } from "@/data/forumThreads";

const Forums = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-background">
      <Header />
      <main className="flex-1 px-5 py-6 space-y-6">
        <Link
          to="/exploring"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-primary" />
            <h1 className="font-display text-xl font-semibold text-foreground">Forums</h1>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Threads from the community on different mental health topics. Read, reflect, or join in.
          </p>
        </div>

        <ul className="space-y-3">
          {FORUM_THREADS.map((thread) => (
            <li key={thread.id}>
              <article className="rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="inline-block text-[11px] font-medium uppercase tracking-wide text-primary">
                    {thread.topic}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{thread.lastActivity}</span>
                </div>
                <h2 className="font-display text-sm font-semibold text-card-foreground">
                  {thread.title}
                </h2>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {thread.excerpt}
                </p>
                <div className="flex items-center justify-between mt-3 text-[11px] text-muted-foreground">
                  <span>by {thread.author}</span>
                  <span>{thread.replies} replies</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Forums;
