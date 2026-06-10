import { Link, useParams } from "react-router-dom";
import { MessageSquare, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { getCategoryBySlug } from "@/data/forumCategories";

const ForumCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  return (
    <div className="relative min-h-screen flex flex-col max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-6">
        <Link
          to="/forums"
          className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={16} />
          All categories
        </Link>

        {!category ? (
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-semibold text-charcoal">
              Category not found
            </h1>
            <p className="text-sm text-charcoal/70">
              This space doesn't exist yet. Head back to explore the others.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lavender/40 text-charcoal">
                  <MessageSquare size={18} />
                </span>
                <h1 className="font-display text-3xl font-semibold text-charcoal leading-tight">
                  {category.name}
                </h1>
              </div>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                {category.description}
              </p>
            </div>

            <ul className="space-y-3">
              {category.threads.map((thread, i) => {
                const tones = [
                  "bg-sage/25 border-sage/50",
                  "bg-lavender/20 border-lavender/50",
                  "bg-peach/25 border-peach/50",
                ];
                const tone = tones[i % tones.length];
                return (
                  <li key={thread.id}>
                    <Link
                      to={`/forums/${category.slug}/${thread.id}`}
                      className={`block rounded-2xl border ${tone} px-4 py-3.5 transition-colors hover:bg-card`}
                    >
                      <h2 className="font-display text-base font-semibold text-charcoal leading-snug">
                        {thread.title}
                      </h2>
                      <p className="text-xs text-charcoal/70 mt-1 leading-relaxed line-clamp-2">
                        {thread.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-3 font-accent text-[11px] text-charcoal/60">
                        <span>{thread.lastActivity}</span>
                        <span>{thread.replies} replies</span>
                      </div>
                    </Link>
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
