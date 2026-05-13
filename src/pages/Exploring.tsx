import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Play, BookOpen, FileText, Sparkles, Wind, MessageCircle, Stethoscope, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { ARTICLES, STORIES, VIDEOS } from "@/data/resources";
import { BREATHING, GROUNDING, AUDIO } from "@/data/tools";
import { MOVEMENT, CREATIVE, CONNECTION } from "@/data/activities";
import { FORUM_CATEGORY_GROUPS } from "@/data/forumCategories";

type ItemType = "Story" | "Article" | "Video" | "Exercise" | "Activity" | "Audio" | "Forum" | "Support";

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
  if (/(overwhelm|anxiet|panic|racing|burnout|stress|grief|low|heavy|hard|crisis|depress)/.test(t)) out.add("When I feel overwhelmed");
  if (/(understand|difference|what (is|anxiety)|explain|science|why|story|first year|learned)/.test(t)) out.add("Understanding what I'm going through");
  if (/(friend|loved|love|talking to|someone|relationship|family|partner|brother|caregiver|support|helping|help my)/.test(t)) out.add("Helping someone I love");
  if (durationMins !== undefined && durationMins <= 5) out.add("I only have a few minutes");
  if (/(start|first|tiny|begin|check-in|grounding|practice|small|gentle|simple)/.test(t)) out.add("I don't know where to start");
  return Array.from(out);
};

const parseMins = (s: string): number | undefined => {
  const m = s.match(/(\d+)/);
  return m ? Number(m[1]) : undefined;
};

// === Read or watch: stories + articles + videos ===
const READ_FEED: FeedItem[] = [
  ...STORIES.map<FeedItem>((s) => ({
    id: `story-${s.id}`,
    type: "Story",
    title: s.title,
    meta: `${s.author} · ${s.readTime}`,
    blurb: s.excerpt,
    themes: themesFor(`${s.title} ${s.excerpt}`, parseMins(s.readTime)),
  })),
  ...ARTICLES.map<FeedItem>((a) => ({
    id: `article-${a.id}`,
    type: "Article",
    title: a.title,
    meta: `${a.category} · ${a.readTime}`,
    blurb: a.summary,
    themes: themesFor(`${a.title} ${a.summary} ${a.category}`, parseMins(a.readTime)),
  })),
  ...VIDEOS.map<FeedItem>((v) => ({
    id: `video-${v.id}`,
    type: "Video",
    title: v.title,
    meta: v.speaker,
    blurb: v.description,
    duration: v.duration,
    themes: themesFor(`${v.title} ${v.description}`, Number(v.duration.split(":")[0])),
  })),
];

// === Do: tools, exercises, breathing, audio, activities ===
const DO_FEED: FeedItem[] = [
  ...BREATHING.map<FeedItem>((b) => ({
    id: `breath-${b.id}`,
    type: "Exercise",
    title: b.title,
    meta: `Breathing · ${b.duration}`,
    blurb: b.description,
    duration: b.duration,
    themes: themesFor(`${b.title} ${b.description} breathing calm`, parseMins(b.duration)),
  })),
  ...GROUNDING.map<FeedItem>((g) => ({
    id: `ground-${g.id}`,
    type: "Exercise",
    title: g.title,
    meta: g.category,
    blurb: g.description,
    themes: themesFor(`${g.title} ${g.description} grounding`, 3),
  })),
  ...AUDIO.map<FeedItem>((a) => ({
    id: `audio-${a.id}`,
    type: "Audio",
    title: a.title,
    meta: `${a.guide}`,
    blurb: a.description,
    duration: a.duration,
    themes: themesFor(`${a.title} ${a.description} calm meditation`, Number(a.duration.split(":")[0])),
  })),
  ...[...MOVEMENT, ...CREATIVE, ...CONNECTION].map<FeedItem>((act) => ({
    id: `act-${act.id}`,
    type: "Activity",
    title: act.title,
    meta: `Activity · ${act.duration}`,
    blurb: act.description,
    duration: act.duration,
    themes: themesFor(`${act.title} ${act.description}`, parseMins(act.duration)),
  })),
];

// === Talk: forums + professional support ===
const TALK_FEED: FeedItem[] = [
  ...FORUM_CATEGORY_GROUPS.flatMap((group) =>
    group.categories.map<FeedItem>((cat) => ({
      id: `forum-${cat.slug}`,
      type: "Forum",
      title: cat.name,
      meta: `${group.title} · ${cat.threads.length} threads`,
      blurb: cat.description,
      themes: themesFor(`${cat.name} ${cat.description} ${group.title}`),
    })),
  ),
  {
    id: "support-therapist",
    type: "Support",
    title: "Find a therapist",
    meta: "Professional · Directory",
    blurb: "Search trusted directories of licensed mental health professionals near you.",
    themes: ["Understanding what I'm going through", "I don't know where to start"],
  },
  {
    id: "support-crisis",
    type: "Support",
    title: "Crisis lines",
    meta: "Professional · 24/7",
    blurb: "Free, confidential support available any time, day or night.",
    themes: ["When I feel overwhelmed", "I only have a few minutes"],
  },
  {
    id: "support-circle",
    type: "Support",
    title: "Small Circle",
    meta: "Caregiver groups",
    blurb: "Support spaces for people caring for someone they love.",
    themes: ["Helping someone I love"],
  },
];

// Editorial picks — hand-curated with a warm one-line note above each.
type EditorialPick = FeedItem & { note: string };

const pickFromFeed = (feed: FeedItem[], match: RegExp): FeedItem | undefined =>
  feed.find((i) => match.test(i.title.toLowerCase()) || match.test(i.blurb.toLowerCase()));

const EDITORIAL_PICKS: EditorialPick[] = [
  {
    ...(READ_FEED.find((i) => i.type === "Story") ?? READ_FEED[0]),
    note: "For when you don't have words yet",
  },
  {
    ...(DO_FEED.find((i) => /breath|breathing/i.test(i.meta)) ?? DO_FEED[0]),
    note: "A good place to begin",
  },
  {
    ...(READ_FEED.find((i) => i.type === "Video") ?? READ_FEED[1] ?? READ_FEED[0]),
    note: "Five quiet minutes, if you have them",
  },
  {
    ...(TALK_FEED[0]),
    note: "When sitting alone gets heavy",
  },
].filter(Boolean) as EditorialPick[];

// Interleave types so the feed reads like a curated browse.
const interleave = (items: FeedItem[]) => {
  const buckets = new Map<ItemType, FeedItem[]>();
  items.forEach((i) => {
    if (!buckets.has(i.type)) buckets.set(i.type, []);
    buckets.get(i.type)!.push(i);
  });
  const order = Array.from(buckets.keys());
  const out: FeedItem[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const t of order) {
      const next = buckets.get(t)!.shift();
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
  Exercise: { tone: "border-sage/30 bg-sage/15", chipTone: "bg-sage/60 text-charcoal", Icon: Wind },
  Activity: { tone: "border-peach/30 bg-peach/15", chipTone: "bg-peach/60 text-charcoal", Icon: Sparkles },
  Audio: { tone: "border-lavender/30 bg-lavender/15", chipTone: "bg-lavender/60 text-charcoal", Icon: Play },
  Forum: { tone: "border-sage/30 bg-sage/15", chipTone: "bg-sage/60 text-charcoal", Icon: MessageCircle },
  Support: { tone: "border-peach/30 bg-peach/15", chipTone: "bg-peach/60 text-charcoal", Icon: Stethoscope },
};

const filterByThemeAndQuery = (items: FeedItem[], query: string, theme: string | null) => {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    if (theme && !item.themes.includes(theme)) return false;
    if (q && !`${item.title} ${item.blurb} ${item.meta}`.toLowerCase().includes(q)) return false;
    return true;
  });
};

const Card = ({ item }: { item: FeedItem }) => {
  const { tone, chipTone, Icon } = TYPE_STYLES[item.type];
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
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  const editorialPicks = useMemo(
    () => filterByThemeAndQuery(EDITORIAL_PICKS, query, activeTheme) as EditorialPick[],
    [query, activeTheme],
  );

  const readItems = useMemo(
    () => interleave(filterByThemeAndQuery(READ_FEED, query, activeTheme)),
    [query, activeTheme],
  );
  const doItems = useMemo(
    () => interleave(filterByThemeAndQuery(DO_FEED, query, activeTheme)),
    [query, activeTheme],
  );
  const talkItems = useMemo(
    () => interleave(filterByThemeAndQuery(TALK_FEED, query, activeTheme)),
    [query, activeTheme],
  );

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

        {/* Editorial picks */}
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

        {/* Three themed rows */}
        <Row
          title="Something to read"
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
