import { Link, useParams } from "react-router-dom";
import { MessageSquare, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategoryBySlug } from "@/data/forumCategories";

const ForumCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

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

            <ul className="space-y-3">
              {category.threads.map((thread) => (
                <li key={thread.id}>
                  <Link
                    to={`/forums/${category.slug}/${thread.id}`}
                    className="block rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 transition-colors"
                  >
                    <h2 className="font-display text-sm font-semibold text-card-foreground leading-snug">
                      {thread.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                      {thread.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-3 text-[11px] text-muted-foreground">
                      <span>{thread.lastActivity}</span>
                      <span>{thread.replies} replies</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ForumCategory;
