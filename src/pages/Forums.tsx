import { Link } from "react-router-dom";
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FORUM_CATEGORY_GROUPS } from "@/data/forumCategories";

const Forums = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-background">
      <Header />
      <main className="flex-1 px-5 py-6 space-y-8">
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
            Pick a space that fits how you're feeling. Each category holds gentle conversations from the community.
          </p>
        </div>

        <div className="space-y-8">
          {FORUM_CATEGORY_GROUPS.map((group) => (
            <section key={group.id} className="space-y-3">
              <div className="space-y-1">
                <h2 className="font-display text-base font-semibold text-foreground">
                  <span className="mr-1.5" aria-hidden>
                    {group.emoji}
                  </span>
                  {group.title}
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {group.subtitle}
                </p>
              </div>

              <ul className="space-y-2">
                {group.categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      to={`/forums/${category.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 hover:bg-accent/40 transition-colors"
                    >
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-card-foreground truncate">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-1">
                          {category.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-muted-foreground">
                          {category.threads.length}
                        </span>
                        <ChevronRight size={16} className="text-muted-foreground" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Forums;
