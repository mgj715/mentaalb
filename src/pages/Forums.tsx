import { useMemo } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { FORUM_CATEGORY_GROUPS } from "@/data/forumCategories";
import { loadQuiz } from "@/lib/quiz-storage";
import { isBlockedByQuiz } from "@/lib/exploring-data";

// All forum cards share the peach tone (community content type).
const FORUM_TONE = "bg-peach/25 border-peach/40 shadow-sm";

const Forums = () => {
  const quiz = useMemo(() => loadQuiz(), []);
  const groups = useMemo(
    () =>
      FORUM_CATEGORY_GROUPS.map((g) => ({
        ...g,
        categories: g.categories.filter(
          (c) => !isBlockedByQuiz(c.name, `${c.description} ${g.title}`, quiz),
        ),
      })).filter((g) => g.categories.length > 0),
    [quiz],
  );
  return (
    <div className="relative min-h-screen flex flex-col max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-8">
        <Link
          to="/exploring"
          className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage/40 text-charcoal">
              <MessageSquare size={18} />
            </span>
            <h1 className="font-display text-3xl font-semibold text-charcoal">Forums</h1>
          </div>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Pick a space that fits how you're feeling. Each category holds gentle conversations from the community.
          </p>
        </div>

        <div className="space-y-8">
          {FORUM_CATEGORY_GROUPS.map((group) => (
            <section key={group.id} className="space-y-3">
              <div className="space-y-1">
                <h2 className="font-display text-xl font-semibold text-charcoal">
                  {group.title}
                </h2>
                <p className="font-accent text-xs text-charcoal/60 leading-relaxed">
                  {group.subtitle}
                </p>
              </div>

              <ul className="space-y-2">
                {group.categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      to={`/forums/${category.slug}`}
                      className={`flex items-center justify-between gap-3 rounded-2xl border ${FORUM_TONE} px-4 py-3.5 transition-colors hover:bg-card`}
                    >
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-semibold text-charcoal truncate">
                          {category.name}
                        </h3>
                        <p className="text-xs text-charcoal/70 mt-0.5 leading-relaxed line-clamp-1">
                          {category.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-accent text-[11px] text-charcoal/60">
                          {category.threads.length}
                        </span>
                        <ChevronRight size={16} className="text-charcoal/60" />
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
