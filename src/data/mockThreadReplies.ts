// Generates deterministic mock posts/comments for a thread so each thread feels
// populated even before real users join. Output is stable for a given threadId.

import type { ForumThread } from "@/data/forumCategories";

export type MockPost = {
  id: string;
  author: string;
  body: string;
  createdLabel: string;
  comments: MockComment[];
};

export type MockComment = {
  id: string;
  author: string;
  body: string;
  createdLabel: string;
};

const AUTHORS = [
  "quiet_dawn",
  "soft_light",
  "river_stones",
  "paper_crane",
  "moon_quiet",
  "warm_hands",
  "still_water",
  "open_window",
  "first_step",
  "new_address",
  "soft_mirror",
  "tired_oak",
];

const TIMES = [
  "2h ago",
  "5h ago",
  "yesterday",
  "yesterday",
  "2d ago",
  "3d ago",
  "4d ago",
  "1w ago",
];

// Pools of replies grouped by loose theme keywords found in the thread title.
const POST_TEMPLATES: Record<string, string[]> = {
  anxiety: [
    "I keep a glass of water on the nightstand and drink slowly before I even open my phone. Sounds tiny but it grounds me.",
    "My therapist suggested naming the feeling out loud — 'this is anxiety, not danger'. It softens the grip a little.",
    "Box breathing for two minutes before I get out of bed has been the single biggest shift for me this year.",
  ],
  overwhelm: [
    "I make the absolute smallest version of the task. 'Open the doc' instead of 'write the report.' Permission to stop after.",
    "Lists help me, but only if I cap them at three items. Anything longer makes me freeze.",
    "Some days I just put on a podcast and let the noise carry me through the first 10 minutes. Movement before motivation.",
  ],
  breathing: [
    "4-7-8 breathing in the bathroom at work has saved me more than once. Nobody knows.",
    "Humming on the exhale activates the vagus nerve apparently. Sounds woo but it actually calms me down.",
    "I time my breath to the second hand of a clock. Watching it tick keeps me from spiraling.",
  ],
  sleep: [
    "Phone goes in another room at 10pm. Painful at first, transformative after a week.",
    "A boring audiobook at low volume puts me out faster than any sleep app.",
    "Same wake-up time every day, even weekends. My body finally trusts the rhythm.",
  ],
  burnout: [
    "Took me a year to realize rest isn't the same as recovery. Now I plan actual nothing-days.",
    "I had to stop saying yes to 'just one quick thing.' Boundaries are the recovery.",
    "Walking without a podcast or phone feels radical now. Twenty minutes of just my own thoughts.",
  ],
  depression: [
    "Some days my only goal is to drink water and open a window. That's enough.",
    "I keep a 'done' list instead of a to-do list. Seeing what I managed feels softer.",
    "Texting one person, even a single emoji, breaks the isolation just a little.",
  ],
  loneliness: [
    "Joined a weekly co-working café meetup. Didn't make best friends but I stopped feeling invisible.",
    "I started saying hi to the same barista every morning. Small, repeated contact rebuilt something.",
    "Being lonely in a crowd is its own kind of heavy. You're not alone in feeling it.",
  ],
  grief: [
    "The waves don't get smaller, I just got better at swimming. That's what someone told me and it stuck.",
    "I light a candle on hard days. Not religious, just a way to mark the feeling.",
    "Letting myself cry in the car is underrated. Private, contained, then I drive home.",
  ],
  hope: [
    "Saving this thread. Needed to see other people noticing the small lights too.",
    "A stranger held the door for me yesterday and I almost cried. The bar is low and that's okay.",
    "Hope feels less like a feeling and more like a practice for me lately.",
  ],
  default: [
    "Thank you for posting this. Reading it made me feel less alone today.",
    "I don't have advice but I see you. Sending warmth.",
    "I'm working through something similar. The fact that you wrote this helps me too.",
    "What you described is exactly how my week has been. Glad someone said it.",
  ],
};

const COMMENT_TEMPLATES = [
  "This resonates so much.",
  "Trying this tomorrow morning. Thank you.",
  "Saving this. Needed it today.",
  "Sending you gentleness.",
  "Same here. You're not alone.",
  "I needed to read this exact thing.",
  "Such a warm reminder.",
];

// Simple deterministic hash so the same threadId always picks the same items.
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const pick = <T>(arr: T[], seed: number, offset = 0): T =>
  arr[(seed + offset) % arr.length];

const themeFor = (text: string): string => {
  const lower = text.toLowerCase();
  for (const key of Object.keys(POST_TEMPLATES)) {
    if (key !== "default" && lower.includes(key)) return key;
  }
  // Loose extra matches
  if (lower.includes("panic") || lower.includes("worry")) return "anxiety";
  if (lower.includes("low mood") || lower.includes("low-energy") || lower.includes("motivation"))
    return "depression";
  if (lower.includes("rest") || lower.includes("wind-down")) return "sleep";
  if (lower.includes("alone") || lower.includes("connect")) return "loneliness";
  if (lower.includes("loss") || lower.includes("waves")) return "grief";
  if (lower.includes("hope") || lower.includes("kindness") || lower.includes("light"))
    return "hope";
  return "default";
};

export const getMockPosts = (thread: ForumThread): MockPost[] => {
  const seed = hash(thread.id);
  const theme = themeFor(`${thread.title} ${thread.excerpt}`);
  const themePool = POST_TEMPLATES[theme] ?? POST_TEMPLATES.default;
  const fallbackPool = POST_TEMPLATES.default;

  // Aim for ~3 mock posts per thread (cap by available replies count).
  const postCount = Math.min(3, Math.max(2, thread.replies > 5 ? 3 : 2));

  return Array.from({ length: postCount }, (_, i) => {
    const useThemePost = i < themePool.length;
    const body = useThemePost
      ? themePool[i % themePool.length]
      : pick(fallbackPool, seed, i);
    const commentCount = (seed + i) % 3; // 0–2 comments per post
    return {
      id: `${thread.id}-mp-${i}`,
      author: pick(AUTHORS, seed, i),
      body,
      createdLabel: pick(TIMES, seed, i),
      comments: Array.from({ length: commentCount }, (_, j) => ({
        id: `${thread.id}-mp-${i}-c-${j}`,
        author: pick(AUTHORS, seed, i + j + 3),
        body: pick(COMMENT_TEMPLATES, seed, i + j + 5),
        createdLabel: pick(TIMES, seed, i + j + 1),
      })),
    };
  });
};
