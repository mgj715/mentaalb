import { ARTICLES, STORIES, VIDEOS } from "@/data/resources";
import { BREATHING, GROUNDING, AUDIO } from "@/data/tools";
import { MOVEMENT, CREATIVE, CONNECTION } from "@/data/activities";
import { FORUM_CATEGORY_GROUPS } from "@/data/forumCategories";
import type { StoredQuiz } from "@/lib/quiz-storage";

export type ItemType =
  | "Story"
  | "Article"
  | "Video"
  | "Exercise"
  | "Activity"
  | "Audio"
  | "Forum"
  | "Support";

export type FeedItem = {
  id: string;
  type: ItemType;
  title: string;
  meta: string;
  blurb: string;
  duration?: string;
  themes: string[];
};

export const THEMES = [
  "When I feel overwhelmed",
  "Understanding what I'm going through",
  "Helping someone I love",
  "I only have a few minutes",
  "I don't know where to start",
] as const;

export type Theme = (typeof THEMES)[number];

const themesFor = (text: string, durationMins?: number): string[] => {
  const t = text.toLowerCase();
  const out = new Set<string>();
  if (/(overwhelm|anxiet|panic|racing|burnout|stress|grief|low|heavy|hard|crisis|depress)/.test(t))
    out.add("When I feel overwhelmed");
  if (/(understand|difference|what (is|anxiety)|explain|science|why|story|first year|learned)/.test(t))
    out.add("Understanding what I'm going through");
  if (/(friend|loved|love|talking to|someone|relationship|family|partner|brother|caregiver|support|helping|help my)/.test(t))
    out.add("Helping someone I love");
  if (durationMins !== undefined && durationMins <= 5) out.add("I only have a few minutes");
  if (/(start|first|tiny|begin|check-in|grounding|practice|small|gentle|simple)/.test(t))
    out.add("I don't know where to start");
  return Array.from(out);
};

const parseMins = (s: string): number | undefined => {
  const m = s.match(/(\d+)/);
  return m ? Number(m[1]) : undefined;
};

export const READ_FEED: FeedItem[] = [
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

export const DO_FEED: FeedItem[] = [
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

export const TALK_FEED: FeedItem[] = [
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

export type EditorialPick = FeedItem & { note: string };

export const DEFAULT_EDITORIAL: EditorialPick[] = [
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
    ...TALK_FEED[0],
    note: "When sitting alone gets heavy",
  },
];

export const interleave = (items: FeedItem[]) => {
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

export const filterByThemeAndQuery = <T extends FeedItem>(
  items: T[],
  query: string,
  theme: string | null,
): T[] => {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    if (theme && !item.themes.includes(theme)) return false;
    if (q && !`${item.title} ${item.blurb} ${item.meta}`.toLowerCase().includes(q)) return false;
    return true;
  });
};

// === Personalization ===

// Predefined sensitive-topic keyword patterns. Match against title + body.
// Crisis-line content is never filtered (handled separately in isBlockedByQuiz).
const SENSITIVE_PATTERNS: Record<string, RegExp> = {
  "Self-harm": /\b(self[\s-]?harm|harm|hurt myself)\b/i,
  "Suicide": /\b(suicide|suicidal|ending life)\b/i,
  "Trauma": /\b(trauma|ptsd|abuse)\b/i,
  "Substance use": /\b(addiction|alcohol|drugs|substance)\b/i,
  "Eating-related issues": /\b(eating disorder|body|food)\b/i,
};

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// True if the given text should be hidden based on the user's sensitive-topic
// preferences. Crisis content is always allowed through.
export const isBlockedByQuiz = (
  title: string,
  body: string,
  q: StoredQuiz | null,
): boolean => {
  if (!q) return false;
  if (/crisis/i.test(title)) return false;
  const topics = (q.sensitiveTopics ?? []).filter(
    (t) => t !== "None of the above",
  );
  const text = `${title} ${body}`;
  for (const t of topics) {
    const pat = SENSITIVE_PATTERNS[t];
    if (pat && pat.test(text)) return true;
  }
  for (const raw of q.customSensitiveTopics ?? []) {
    const w = raw.trim();
    if (!w) continue;
    if (new RegExp(escapeRegex(w), "i").test(text)) return true;
  }
  return false;
};

// Hide feed items the user has opted out of.
export const filterSensitiveFeed = <T extends FeedItem>(
  items: T[],
  q: StoredQuiz | null,
): T[] => items.filter((i) => !isBlockedByQuiz(i.title, `${i.blurb} ${i.meta}`, q));

const parseDurationMins = (i: FeedItem): number => {
  const s = i.duration ?? i.meta ?? "";
  const m = s.match(/(\d+)/);
  return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
};

// Reorder feed items so ones matching the user's available time appear first.
// "Longer" or no value → no reorder.
export const rankByTime = <T extends FeedItem>(
  items: T[],
  timeEnergy?: string,
): T[] => {
  if (!timeEnergy) return items;
  let threshold: number | null = null;
  if (/^(A minute|Around 5)/i.test(timeEnergy)) threshold = 5;
  else if (/^Around 10/i.test(timeEnergy)) threshold = 10;
  else if (/^(1 minute|5 minutes)$/i.test(timeEnergy)) threshold = 5; // legacy
  else if (/^10 minutes$/i.test(timeEnergy)) threshold = 10; // legacy
  if (threshold === null) return items;
  const t = threshold;
  const fast: T[] = [];
  const rest: T[] = [];
  for (const it of items) (parseDurationMins(it) <= t ? fast : rest).push(it);
  return [...fast, ...rest];
};

// Section slots on YourSpace / Exploring.
export type SectionSlot = "read" | "do" | "talk";
const PRIORITY_TO_SLOT: Record<string, SectionSlot> = {
  "Understanding what's going on": "read",
  "Resources and information": "read",
  "Practical tools and exercises": "do",
  "Activities to feel better": "do",
  "Peer stories and experiences": "talk",
};

export const sectionOrder = (q: StoredQuiz | null): SectionSlot[] => {
  const order: SectionSlot[] = [];
  const seen = new Set<SectionSlot>();
  for (const p of q?.priorities ?? []) {
    const slot = PRIORITY_TO_SLOT[p];
    if (slot && !seen.has(slot)) {
      order.push(slot);
      seen.add(slot);
    }
  }
  for (const s of ["read", "do", "talk"] as SectionSlot[]) {
    if (!seen.has(s)) order.push(s);
  }
  return order;
};

export const themeFromQuiz = (q: StoredQuiz | null): Theme | null => {
  if (!q) return null;
  if (q.isCaregiver) return "Helping someone I love";
  switch (q.currentState) {
    case "I'm feeling overwhelmed":
      return "When I feel overwhelmed";
    case "I'm worried about someone else":
      return "Helping someone I love";
    case "I'm looking for guidance":
    case "I'm not sure how I'm feeling":
    case "I don't know where to start":
      return "I don't know where to start";
    default:
      break;
  }
  if (q.timeEnergy && /^(A minute|Around 5|1 minute|5 minutes)/i.test(q.timeEnergy))
    return "I only have a few minutes";
  return null;
};

// Map preferred support style → ranked list of types (most preferred first)
const STYLE_TYPE_PRIORITY: Record<string, ItemType[]> = {
  "Stories from others": ["Story", "Forum", "Article", "Video"],
  "Short, practical tips": ["Exercise", "Activity", "Article"],
  "Step-by-step guidance": ["Article", "Exercise", "Audio"],
  "Calm explanations": ["Article", "Story", "Video"],
  "Activities and exercises": ["Activity", "Exercise", "Audio"],
  "Professional resources": ["Support", "Article"],
};

export const rankByStyle = <T extends FeedItem>(items: T[], style?: string): T[] => {
  const order = (style && STYLE_TYPE_PRIORITY[style]) || [];
  if (!order.length) return items;
  const score = (it: T) => {
    const idx = order.indexOf(it.type);
    return idx === -1 ? 999 : idx;
  };
  return [...items].sort((a, b) => score(a) - score(b));
};

const editorialNote = (type: ItemType, q: StoredQuiz): string => {
  if (q.isCaregiver) {
    if (type === "Story") return "From someone who's been where you are";
    if (type === "Exercise" || type === "Audio") return "A small reset, just for you";
    if (type === "Support" || type === "Forum") return "You don't have to carry this alone";
  }
  switch (type) {
    case "Story":
      return "For when you don't have words yet";
    case "Article":
      return "A gentle place to begin";
    case "Video":
      return "Five quiet minutes, if you have them";
    case "Exercise":
      return "Something small, right now";
    case "Audio":
      return "Press play and breathe";
    case "Activity":
      return "Move a little, feel a little";
    case "Forum":
      return "Voices from people like you";
    case "Support":
      return "When sitting alone gets heavy";
  }
};

// Build personalized editorial picks based on quiz answers.
export const personalizedEditorial = (q: StoredQuiz | null): EditorialPick[] => {
  if (!q) return DEFAULT_EDITORIAL;
  const theme = themeFromQuiz(q);
  const themed = (feed: FeedItem[]) => {
    const safe = filterSensitiveFeed(feed, q);
    return theme ? safe.filter((i) => i.themes.includes(theme)) : safe;
  };
  const order = sectionOrder(q);
  const feedFor = (s: SectionSlot) =>
    s === "read" ? READ_FEED : s === "do" ? DO_FEED : TALK_FEED;
  const picks: EditorialPick[] = [];
  const pushFrom = (feed: FeedItem[]) => {
    const ranked = rankByTime(rankByStyle(feed, q.supportStyle), q.timeEnergy);
    const item = ranked[0];
    if (!item) return;
    if (picks.find((p) => p.id === item.id)) return;
    picks.push({ ...item, note: editorialNote(item.type, q) });
  };
  for (const slot of order) pushFrom(themed(feedFor(slot)));
  // Ensure at least 3-4 picks
  if (picks.length < 4) {
    const pool = rankByTime(
      rankByStyle(themed([...READ_FEED, ...DO_FEED]), q.supportStyle),
      q.timeEnergy,
    );
    const extra = pool.find((i) => !picks.find((p) => p.id === i.id));
    if (extra) picks.push({ ...extra, note: editorialNote(extra.type, q) });
  }
  return picks.length ? picks : DEFAULT_EDITORIAL;
};

// Pick personalized items, one from each slot in the user's priority order.
export const buildPersonalPicks = (q: StoredQuiz | null, offset = 0): FeedItem[] => {
  const theme = themeFromQuiz(q);
  const feedFor = (s: SectionSlot) =>
    s === "read" ? READ_FEED : s === "do" ? DO_FEED : TALK_FEED;
  const pickFrom = (feed: FeedItem[]): FeedItem | undefined => {
    const safe = filterSensitiveFeed(feed, q);
    const themed = theme ? safe.filter((i) => i.themes.includes(theme)) : safe;
    const ranked = rankByTime(
      rankByStyle(themed.length ? themed : safe, q?.supportStyle),
      q?.timeEnergy,
    );
    if (!ranked.length) return undefined;
    return ranked[offset % ranked.length];
  };
  const order = sectionOrder(q);
  return order.map((s) => pickFrom(feedFor(s))).filter(Boolean) as FeedItem[];
};

// A short, situation-aware header for the personal home page.
export const personalSpaceHeader = (q: StoredQuiz | null): { title: string; sub?: string } => {
  if (!q) return { title: "No pressure. Stay as long as you need." };
  if (q.isCaregiver)
    return {
      title: "You're looking after someone.",
      sub: "This is where you look after yourself.",
    };
  if (q.currentState === "I'm feeling overwhelmed")
    return { title: "You showed up. That's enough for today." };
  if (q.currentState === "I don't know where to start")
    return { title: "Starting small is still starting." };
  if (q.currentState === "I'm looking for guidance")
    return { title: "A gentle place to land." };
  if (q.currentState === "I'm worried about someone else")
    return { title: "Caring for someone takes care, too." };
  return { title: "No pressure. Stay as long as you need." };
};

export const personalizedHeading = (q: StoredQuiz | null): { title: string; sub: string } => {
  if (!q) return { title: "We've put together a space for you.", sub: "" };
  if (q.isCaregiver) {
    if (q.caregiverNeed === "How to take care of myself")
      return {
        title: "You're looking after someone. We'll help you look after yourself too.",
        sub: "A few gentle starting points, picked for you.",
      };
    if (q.caregiverNeed === "What to do in difficult moments")
      return {
        title: "For the harder moments — you don't have to face them alone.",
        sub: "Practical, calm support to come back to.",
      };
    return {
      title: "Caring for someone takes care, too.",
      sub: "Here's a small space shaped around what you shared.",
    };
  }
  if (q.currentState === "I'm feeling overwhelmed")
    return {
      title: "We've put together a space for you.",
      sub: "Soft, slow, and at your pace.",
    };
  if (q.currentState === "I don't know where to start")
    return {
      title: "Starting somewhere small is enough.",
      sub: "A few quiet entry points, picked for you.",
    };
  if (q.currentState === "I'm looking for guidance")
    return {
      title: "Here's a gentle place to begin.",
      sub: "Hand-picked from what you shared.",
    };
  return {
    title: "A space, shaped around what you shared.",
    sub: "Take what helps. Leave what doesn't.",
  };
};

// === Caregiver Journey ===

export type CaregiverStage = {
  id: "understand" | "support" | "self-care";
  title: string;
  description: string;
  match: (item: FeedItem) => boolean;
};

export const CAREGIVER_STAGES: CaregiverStage[] = [
  {
    id: "understand",
    title: "Understanding what they're going through",
    description: "Recognising the signs and what mental health struggles can feel like.",
    match: (i) =>
      /understand|recogniz|sign|symptom|what (is|are)|first year|learned|story|experienc/i.test(
        `${i.title} ${i.blurb} ${i.meta}`,
      ),
  },
  {
    id: "support",
    title: "How to be there for them",
    description: "Practical guidance on supporting a loved one without burning out.",
    match: (i) =>
      /support|help|listen|conversation|talking|friend|loved|partner|family|caregiver|be there/i.test(
        `${i.title} ${i.blurb} ${i.meta}`,
      ),
  },
  {
    id: "self-care",
    title: "Looking after yourself",
    description: "Self-care, rest, and small resets — for the person doing the caring.",
    match: (i) =>
      /breath|ground|calm|rest|burnout|self|boundar|small reset|meditation|circle/i.test(
        `${i.title} ${i.blurb} ${i.meta}`,
      ),
  },
];

export const stageContent = (stageId: CaregiverStage["id"]): FeedItem[] => {
  const stage = CAREGIVER_STAGES.find((s) => s.id === stageId);
  if (!stage) return [];
  const all = [...READ_FEED, ...DO_FEED, ...TALK_FEED];
  const matched = all.filter(stage.match);
  // dedupe by id, cap at 8
  const seen = new Set<string>();
  const out: FeedItem[] = [];
  for (const item of matched) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
    if (out.length >= 8) break;
  }
  return out;
};

// === Patient Journey ===

export type PatientStage = {
  id: "understand-self" | "find-help" | "next-step";
  title: string;
  description: string;
  match: (item: FeedItem) => boolean;
};

export const PATIENT_STAGES: PatientStage[] = [
  {
    id: "understand-self",
    title: "Understanding what's happening to me",
    description: "Making sense of what you're feeling, recognising it, and giving it a name.",
    match: (i) =>
      /understand|recogniz|difference|what (is|are)|story|learned/i.test(
        `${i.title} ${i.blurb} ${i.meta}`,
      ),
  },
  {
    id: "find-help",
    title: "Finding what helps",
    description: "Small things that have helped others — tools, practices, and stories at your own pace.",
    match: (i) =>
      /breath|ground|tool|exercise|practice|small|gentle|calm/i.test(
        `${i.title} ${i.blurb} ${i.meta}`,
      ),
  },
  {
    id: "next-step",
    title: "Taking the next step",
    description: "When you feel ready — connecting with others or finding the right support.",
    match: (i) =>
      /forum|support|therapist|connect|communit|circle|next/i.test(
        `${i.title} ${i.blurb} ${i.meta}`,
      ),
  },
];

export const patientStageContent = (stageId: PatientStage["id"]): FeedItem[] => {
  const stage = PATIENT_STAGES.find((s) => s.id === stageId);
  if (!stage) return [];
  const all = [...READ_FEED, ...DO_FEED, ...TALK_FEED];
  const matched = all.filter(stage.match);
  const seen = new Set<string>();
  const out: FeedItem[] = [];
  for (const item of matched) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
    if (out.length >= 8) break;
  }
  return out;
};
