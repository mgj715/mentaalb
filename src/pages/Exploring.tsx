import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Play, BookOpen, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { ARTICLES, STORIES, VIDEOS } from "@/data/resources";

type ItemType = "Story" | "Article" | "Video";

type FeedItem = {
  id: string;
  type: ItemType;
  title: string;
  meta: string;
  blurb: string;
  duration?: string;
  themes: string[];
};

const THEMES = [
  "When I feel overwhelmed",
  "Understanding what I'm going through",
  "Helping someone I love",
  "I only have a few minutes",
  "I don't know where to start",
] as const;

// Lightweight tagging — assigns themes by keyword matching so the existing
// resources data drives the experience without a schema change.
const themesFor = (text: string, durationMins?: number): string[] => {
  const t = text.toLowerCase();
  const out = new Set<string>();
  if (/(overwhelm|anxiet|panic|racing|burnout|stress|grief)/.test(t)) out.add("When I feel overwhelmed");
  if (/(understand|difference|what (is|anxiety)|explain|science|why)/.test(t)) out.add("Understanding what I'm going through");
  if (/(friend|loved|love|talking to|someone|relationship|family|partner|brother)/.test(t)) out.add("Helping someone I love");
  if (durationMins !== undefined && durationMins <= 5) out.add("I only have a few minutes");
  if (/(start|first|tiny|begin|check-in|grounding|practice)/.test(t)) out.add("I don't know where to start");
  return Array.from(out);
};

const parseMins = (s: string): number | undefined => {
  const m = s.match(/(\d+)/);
  return m ? Number(m[1]) : undefined;
};

const FEED: FeedItem[] = [
  ...STORIES.map<FeedItem>((s) => ({
    id: s.id,
    type: "Story",
    title: s.title,
    meta: `${s.author} · ${s.readTime}`,
    blurb: s.excerpt,
    themes: themesFor(`${s.title} ${s.excerpt}`, parseMins(s.readTime)),
  })),
  ...ARTICLES.map<FeedItem>((a) => ({
    id: a.id,
    type: "Article",
    title: a.title,
    meta: `${a.category} · ${a.readTime}`,
    blurb: a.summary,
    themes: themesFor(`${a.title} ${a.summary} ${a.category}`, parseMins(a.readTime)),
  })),
  ...VIDEOS.map<FeedItem>((v) => ({
    id: v.id,
    type: "Video",
    title: v.title,
    meta: v.speaker,
    blurb: v.description,
    duration: v.duration,
    themes: themesFor(`${v.title} ${v.description}`, Number(v.duration.split(":")[0])),
  })),
];

// Interleave types so the feed reads like a curated browse.
const interleave = (items: FeedItem[]) => {
  const buckets: Record<ItemType, FeedItem[]> = { Story: [], Article: [], Video: [] };
  items.forEach((i) => buckets[i.type].push(i));
  const order: ItemType[] = ["Story", "Article", "Video"];
  const out: FeedItem[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const t of order) {
      const next = buckets[t].shift();
      if (next) {
        out.push(next);
        added = true;
      }
    }
  }
  return out;
};

const TYPE_STYLES: Record<ItemType, { tone: string; chipTone: string; Icon: typeof BookOpen }> = {
  Story: { tone: "border-peach/30 bg-peach/15", chipTone: "bg-peach/60 text-charcoal", Icon: BookOpen },
  Article: { tone: "border-sage/30 bg-sage/15", chipTone: "bg-sage/60 text-charcoal", Icon: FileText },
  Video: { tone: "border-lavender/30 bg-lavender/15", chipTone: "bg-lavender/60 text-charcoal", Icon: Play },
};

const Exploring = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FEED.filter((item) => {
      if (activeTheme && !item.themes.includes(activeTheme)) return false;
      if (q && !`${item.title} ${item.blurb} ${item.meta}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, activeTheme]);

  const feed = useMemo(() => interleave(filtered), [filtered]);
  // Carousel previews top-of-feed items (refreshes with theme/search).
  const carousel = feed.slice(0, 6);

  return (
    <div className="relative min-h-screen flex flex-col max-w-md mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-charcoal">Explore freely</h1>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Wander through stories, ideas, and small practices. Take what helps.
          </p>
        </div>

        {/* Search */}
        <label className="flex items-center gap-2 rounded-full border border-stone/60 bg-warm-white/80 px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-ring/50">
          <Search size={16} className="text-charcoal/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none"
          />
        </label>

        {/* Themes */}
        <div className="-mx-5 px-5 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 w-max pb-1">
            <button
              onClick={() => setActiveTheme(null)}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-accent transition-colors ${
                activeTheme === null
                  ? "bg-charcoal text-warm-white border-charcoal"
                  : "bg-warm-white/70 text-charcoal/80 border-stone/60 hover:bg-warm-white"
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
                      : "bg-warm-white/70 text-charcoal/80 border-stone/60 hover:bg-warm-white"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel preview */}
        {carousel.length > 0 && (
          <section className="-mx-5">
            <div className="px-5 mb-2 flex items-baseline justify-between">
              <h2 className="font-display text-lg font-semibold text-charcoal">A taste of what's here</h2>
              <span className="font-accent text-[11px] text-charcoal/50">scroll →</span>
            </div>
            <div className="px-5 overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 w-max pb-2">
                {carousel.map((item) => {
                  const { tone, chipTone, Icon } = TYPE_STYLES[item.type];
                  return (
                    <article
                      key={`carousel-${item.id}`}
                      className={`w-56 shrink-0 rounded-2xl border ${tone} overflow-hidden`}
                    >
                      {item.type === "Video" ? (
                        <div className="relative aspect-video w-full bg-gradient-to-br from-lavender/60 via-sage/40 to-peach/50 flex items-center justify-center">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/80 text-charcoal shadow-sm">
                            <Play size={16} className="ml-0.5" />
                          </span>
                          {item.duration && (
                            <span className="absolute bottom-2 right-2 rounded-full bg-charcoal/70 px-2 py-0.5 text-[10px] font-accent text-warm-white">
                              {item.duration}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="aspect-video w-full bg-gradient-to-br from-warm-white via-beige to-stone/30 flex items-end p-3">
                          <Icon size={20} className="text-charcoal/60" />
                        </div>
                      )}
                      <div className="px-3.5 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-accent ${chipTone}`}>
                          <Icon size={10} />
                          {item.type}
                        </span>
                        <p className="font-display text-sm font-semibold text-charcoal leading-snug mt-1.5 line-clamp-2">
                          {item.title}
                        </p>
                        <p className="font-accent text-[11px] text-charcoal/60 mt-1 line-clamp-1">{item.meta}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Mixed feed */}
        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-charcoal">
              {activeTheme ?? "For you to wander through"}
            </h2>
            <span className="font-accent text-[11px] text-charcoal/50">
              {feed.length} {feed.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          {feed.length === 0 ? (
            <div className="rounded-2xl border border-stone/40 bg-warm-white/60 px-4 py-6 text-center">
              <p className="font-display text-base text-charcoal">Nothing matches yet.</p>
              <p className="text-xs text-charcoal/60 mt-1">Try a different theme, or clear your search.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {feed.map((item) => {
                const { tone, chipTone, Icon } = TYPE_STYLES[item.type];
                return (
                  <article
                    key={`feed-${item.id}`}
                    className={`rounded-2xl border ${tone} px-4 py-3.5`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-accent ${chipTone}`}>
                        <Icon size={10} />
                        {item.type}
                      </span>
                      {item.duration && (
                        <span className="font-accent text-[10px] text-charcoal/60">{item.duration}</span>
                      )}
                    </div>
                    <p className="font-display text-base font-semibold text-charcoal leading-snug mt-1.5">
                      {item.title}
                    </p>
                    <p className="font-accent text-xs text-charcoal/60 mt-0.5">{item.meta}</p>
                    <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">{item.blurb}</p>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Exploring;
