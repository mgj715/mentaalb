import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Play, BookOpen, FileText, Sparkles, Wind, MessageCircle, Stethoscope } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { loadQuiz } from "@/lib/quiz-storage";
import {
  READ_FEED,
  DO_FEED,
  TALK_FEED,
  DEFAULT_EDITORIAL,
  THEMES,
  type FeedItem,
  type ItemType,
  type EditorialPick,
  interleave,
  filterByThemeAndQuery,
  personalizedEditorial,
  themeFromQuiz,
  rankByStyle,
} from "@/lib/exploring-data";

const TYPE_STYLES: Record<ItemType, { tone: string; chipTone: string; Icon: typeof BookOpen }> = {
  Story: { tone: "border-lavender/40 bg-lavender/25 shadow-sm", chipTone: "bg-lavender/60 text-charcoal", Icon: BookOpen },
  Article: { tone: "border-lavender/40 bg-lavender/25 shadow-sm", chipTone: "bg-lavender/60 text-charcoal", Icon: FileText },
  Video: { tone: "border-lavender/40 bg-lavender/25 shadow-sm", chipTone: "bg-lavender/60 text-charcoal", Icon: Play },
  Exercise: { tone: "border-sage/40 bg-sage/25 shadow-sm", chipTone: "bg-sage/60 text-charcoal", Icon: Wind },
  Activity: { tone: "border-sage/40 bg-sage/25 shadow-sm", chipTone: "bg-sage/60 text-charcoal", Icon: Sparkles },
  Audio: { tone: "border-sage/40 bg-sage/25 shadow-sm", chipTone: "bg-sage/60 text-charcoal", Icon: Play },
  Forum: { tone: "border-peach/40 bg-peach/25 shadow-sm", chipTone: "bg-peach/60 text-charcoal", Icon: MessageCircle },
  Support: { tone: "border-peach/40 bg-peach/25 shadow-sm", chipTone: "bg-peach/60 text-charcoal", Icon: Stethoscope },
};

const isCrisisItem = (title: string) => /crisis/i.test(title);

const Card = ({ item }: { item: FeedItem }) => {
  const { tone, chipTone, Icon } = TYPE_STYLES[item.type];
  const crisis = isCrisisItem(item.title);
  if (crisis) {
    return (
      <article className="w-60 shrink-0 rounded-2xl bg-[#1e2329] px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-accent bg-warm-white/15 text-warm-white">
            <Icon size={10} />
            {item.type}
          </span>
          {item.duration && (
            <span className="font-accent text-[10px] text-warm-white/65">{item.duration}</span>
          )}
        </div>
        <p className="font-display text-base font-semibold text-warm-white leading-snug mt-1.5 line-clamp-2">
          {item.title}
        </p>
        <p className="font-accent text-[11px] text-warm-white/65 mt-0.5 line-clamp-1">{item.meta}</p>
        <p className="text-xs text-warm-white/80 mt-2 leading-relaxed line-clamp-3">{item.blurb}</p>
      </article>
    );
  }
  return (
    <article className={`w-60 shrink-0 rounded-2xl border ${tone} px-4 py-3.5`}>
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-accent ${chipTone}`}>
          <Icon size={10} />
          {item.type}
        </span>
        {item.duration && (
          <span className="font-accent text-[10px] text-charcoal/60">{item.duration}</span>
        )}
      </div>
      <p className="font-display text-base font-semibold text-charcoal leading-snug mt-1.5 line-clamp-2">
        {item.title}
      </p>
      <p className="font-accent text-[11px] text-charcoal/60 mt-0.5 line-clamp-1">{item.meta}</p>
      <p className="text-xs text-charcoal/70 mt-2 leading-relaxed line-clamp-3">{item.blurb}</p>
    </article>
  );
};

const Row = ({
  title,
  items,
  seeAllHref,
  emptyHint,
  navigate,
}: {
  title: string;
  items: FeedItem[];
  seeAllHref: string;
  emptyHint: string;
  navigate: ReturnType<typeof useNavigate>;
}) => (
  <section className="-mx-5">
    <div className="px-5 mb-2 flex items-baseline justify-between">
      <h2 className="font-display text-lg font-semibold text-charcoal">{title}</h2>
      <button
        onClick={() => navigate(seeAllHref)}
        className="font-accent text-[11px] text-charcoal/60 hover:text-charcoal transition-colors"
      >
        see all →
      </button>
    </div>
    {items.length === 0 ? (
      <div className="mx-5 rounded-2xl border border-stone/40 bg-warm-white/60 px-4 py-5 text-center">
        <p className="font-accent text-xs text-charcoal/60">{emptyHint}</p>
      </div>
    ) : (
      <div className="px-5 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 w-max pb-2">
          {items.map((item) => (
            <Card key={`${title}-${item.id}`} item={item} />
          ))}
        </div>
      </div>
    )}
  </section>
);

const Exploring = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const quiz = useMemo(() => loadQuiz(), []);
  const personalizedTheme = useMemo(() => themeFromQuiz(quiz), [quiz]);
  const [activeTheme, setActiveTheme] = useState<string | null>(personalizedTheme);

  // If quiz is loaded after first render (rare), keep selection in sync.
  useEffect(() => {
    if (personalizedTheme && activeTheme === null) setActiveTheme(personalizedTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalizedTheme]);

  const supportStyle = quiz?.supportStyle;

  const editorialPicks = useMemo<EditorialPick[]>(() => {
    const base = quiz ? personalizedEditorial(quiz) : DEFAULT_EDITORIAL;
    return filterByThemeAndQuery(base, query, activeTheme);
  }, [query, activeTheme, quiz]);

  const readItems = useMemo(
    () => rankByStyle(interleave(filterByThemeAndQuery(READ_FEED, query, activeTheme)), supportStyle),
    [query, activeTheme, supportStyle],
  );
  const doItems = useMemo(
    () => rankByStyle(interleave(filterByThemeAndQuery(DO_FEED, query, activeTheme)), supportStyle),
    [query, activeTheme, supportStyle],
  );
  const talkItems = useMemo(
    () => rankByStyle(interleave(filterByThemeAndQuery(TALK_FEED, query, activeTheme)), supportStyle),
    [query, activeTheme, supportStyle],
  );

  return (
    <div className="relative min-h-screen flex flex-col max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-6">
        <button
          onClick={() => (quiz ? navigate("/your-space") : navigate(-1))}
          className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={16} />
          {quiz ? "Back to your space" : "Back"}
        </button>

        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-charcoal">Explore freely</h1>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Wander through stories, ideas, and small practices. Take what helps.
          </p>
        </div>

        {!quiz && (
          <button
            onClick={() => navigate("/quiz")}
            className="w-full text-left rounded-2xl border-2 border-lavender/60 bg-lavender/30 shadow-sm px-4 py-3 hover:bg-lavender/40 transition-colors"
          >
            <p className="font-display text-sm text-charcoal">
              Want a more personal experience?{" "}
              <span className="font-accent text-charcoal/70">Answer a few questions →</span>
            </p>
          </button>
        )}

        <label className="flex items-center gap-2 rounded-full border border-stone bg-warm-white/80 px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-ring/50">
          <Search size={16} className="text-charcoal/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none"
          />
        </label>

        <div className="-mx-5 px-5 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 w-max pb-1">
            <button
              onClick={() => setActiveTheme(null)}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-accent transition-colors ${
                activeTheme === null
                  ? "bg-charcoal text-warm-white border-charcoal"
                  : "bg-warm-white/70 text-charcoal/80 border-stone hover:bg-warm-white"
              }`}
            >
              All
            </button>
            {THEMES.map((t) => {
              const active = activeTheme === t;
              return (
                <button
                  key={t}
                  onClick={() => setActiveTheme(active ? null : t)}
                  className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-accent transition-colors ${
                    active
                      ? "bg-charcoal text-warm-white border-charcoal"
                      : "bg-warm-white/70 text-charcoal/80 border-stone hover:bg-warm-white"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {editorialPicks.length > 0 && (
          <section className="-mx-5">
            <div className="px-5 mb-2">
              <h2 className="font-display text-lg font-semibold text-charcoal">Where others have started</h2>
              <p className="font-accent text-[11px] text-charcoal/55 mt-0.5">A small, hand-picked handful — not a library.</p>
            </div>
            <div className="px-5 overflow-x-auto scrollbar-hide">
              <div className="flex gap-3.5 w-max pb-2">
                {editorialPicks.map((item) => {
                  const { tone, chipTone, Icon } = TYPE_STYLES[item.type];
                  const crisis = isCrisisItem(item.title);
                  if (crisis) {
                    return (
                      <article
                        key={`editorial-${item.id}`}
                        className="w-72 shrink-0 rounded-2xl bg-[#1e2329] px-5 py-4"
                      >
                        <p className="font-display italic text-[13px] text-warm-white/75 leading-snug">
                          {item.note}
                        </p>
                        <div className="mt-2.5 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-accent bg-warm-white/15 text-warm-white">
                            <Icon size={10} />
                            {item.type}
                          </span>
                          {item.duration && (
                            <span className="font-accent text-[10px] text-warm-white/65">{item.duration}</span>
                          )}
                        </div>
                        <p className="font-display text-lg font-semibold text-warm-white leading-snug mt-1.5 line-clamp-2">
                          {item.title}
                        </p>
                        <p className="font-accent text-[11px] text-warm-white/65 mt-0.5 line-clamp-1">{item.meta}</p>
                        <p className="text-xs text-warm-white/80 mt-2 leading-relaxed line-clamp-3">{item.blurb}</p>
                      </article>
                    );
                  }
                  return (
                    <article
                      key={`editorial-${item.id}`}
                      className={`w-72 shrink-0 rounded-2xl border ${tone} px-5 py-4`}
                    >
                      <p className="font-display italic text-[13px] text-charcoal/70 leading-snug">
                        {item.note}
                      </p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-accent ${chipTone}`}>
                          <Icon size={10} />
                          {item.type}
                        </span>
                        {item.duration && (
                          <span className="font-accent text-[10px] text-charcoal/60">{item.duration}</span>
                        )}
                      </div>
                      <p className="font-display text-lg font-semibold text-charcoal leading-snug mt-1.5 line-clamp-2">
                        {item.title}
                      </p>
                      <p className="font-accent text-[11px] text-charcoal/60 mt-0.5 line-clamp-1">{item.meta}</p>
                      <p className="text-xs text-charcoal/70 mt-2 leading-relaxed line-clamp-3">{item.blurb}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <Row
          title="Something to read or watch"
          items={readItems}
          seeAllHref="/resources"
          emptyHint="Nothing matches this theme yet — try another."
          navigate={navigate}
        />
        <Row
          title="Something to do"
          items={doItems}
          seeAllHref="/tools"
          emptyHint="No practices match yet — try another theme."
          navigate={navigate}
        />
        <Row
          title="Someone to talk to"
          items={talkItems}
          seeAllHref="/forums"
          emptyHint="No spaces match this theme yet — try another."
          navigate={navigate}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Exploring;
