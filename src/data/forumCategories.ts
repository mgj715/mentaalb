// Forum categories grouped by theme. Each category has a slug used in URLs
// and a list of threads belonging to it.

export type ForumThread = {
  id: string;
  title: string;
  excerpt: string;
  replies: number;
  lastActivity: string; // soft timestamp like "recently", "earlier today"
};

export type ForumCategory = {
  slug: string;
  name: string;
  description: string;
  threads: ForumThread[];
};

export type ForumCategoryGroup = {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  categories: ForumCategory[];
};

const t = (
  id: string,
  title: string,
  excerpt: string,
  replies: number,
  lastActivity: string,
): ForumThread => ({ id, title, excerpt, replies, lastActivity });

export const FORUM_CATEGORY_GROUPS: ForumCategoryGroup[] = [
  {
    id: "core-emotional",
    emoji: "🌿",
    title: "Core Emotional Support",
    subtitle: "Anchor spaces most people gravitate toward.",
    categories: [
      {
        slug: "anxiety-overwhelm",
        name: "Anxiety & Overwhelm",
        description: "When the day feels louder than you can handle.",
        threads: [
          t("a1", "Morning anxiety spirals — what helps you?", "I wake up with my chest already tight. Looking for small rituals that ease the day.", 24, "a few hours ago"),
          t("a2", "Overwhelm at the smallest tasks", "Even replying to a message feels like a wall. How do you start?", 17, "earlier today"),
          t("a3", "Breathing techniques that actually work", "Sharing the ones that have helped me ride the wave.", 31, "yesterday"),
        ],
      },
      {
        slug: "low-mood-depression",
        name: "Low Mood & Depression",
        description: "Soft place for heavy days.",
        threads: [
          t("d1", "Getting through low-energy days", "Some days even brushing my teeth feels like a mountain.", 41, "a few hours ago"),
          t("d2", "Tiny wins I'm proud of this week", "Made the bed. Opened the curtains. Counts.", 22, "recently"),
          t("d3", "When motivation just won't come", "Waiting for the spark vs. moving without it.", 19, "yesterday"),
        ],
      },
      {
        slug: "stress-burnout",
        name: "Stress & Burnout",
        description: "For when the tank is running on empty.",
        threads: [
          t("b1", "Recovering from burnout takes longer than I thought", "Three months off and I still feel hollow.", 18, "yesterday"),
          t("b2", "Saying no without guilt", "Practicing the smallest 'no' this week.", 14, "a few days ago"),
        ],
      },
      {
        slug: "loneliness",
        name: "Loneliness & Disconnection",
        description: "You're not the only one feeling this.",
        threads: [
          t("l1", "Lonely even in a full room", "Surrounded by people but still unseen. Anyone else?", 28, "earlier today"),
          t("l2", "Friendships that fade in your 30s", "Trying to make peace with shifting circles.", 16, "a few days ago"),
        ],
      },
      {
        slug: "grief-loss",
        name: "Grief & Loss",
        description: "Riding the waves at your own pace.",
        threads: [
          t("g1", "Grief comes in waves — riding them", "It's been a year and the waves still knock me down.", 32, "yesterday"),
          t("g2", "Anniversaries and quiet days", "How do you mark them gently?", 11, "a few days ago"),
        ],
      },
      {
        slug: "life-transitions",
        name: "Life Transitions",
        description: "Moving, breakups, job changes — anything in-between.",
        threads: [
          t("tr1", "Starting over after a breakup", "Rebuilding the small routines first.", 20, "earlier today"),
          t("tr2", "First weeks in a new job", "Imposter feelings and how I'm grounding.", 9, "a few days ago"),
        ],
      },
    ],
  },
  {
    id: "coping-skills",
    emoji: "🌱",
    title: "Coping & Skills",
    subtitle: "Tools, routines, and grounding strategies.",
    categories: [
      {
        slug: "coping-tools",
        name: "Coping Tools & Techniques",
        description: "What's in your toolkit?",
        threads: [
          t("c1", "The 5-4-3-2-1 grounding exercise", "How I use it on the train when panic hits.", 26, "a few hours ago"),
          t("c2", "Journaling prompts that helped me", "Three questions I return to when overwhelmed.", 18, "yesterday"),
        ],
      },
      {
        slug: "mindfulness-grounding",
        name: "Mindfulness & Grounding",
        description: "Coming back to the present, gently.",
        threads: [
          t("m1", "Two-minute mindfulness for busy days", "Tiny pockets of stillness count too.", 13, "earlier today"),
          t("m2", "When meditation feels impossible", "Movement-based alternatives I've tried.", 21, "a few days ago"),
        ],
      },
      {
        slug: "sleep-rest",
        name: "Sleep & Rest",
        description: "Because rest is part of mental health too.",
        threads: [
          t("s1", "When sleep slips, everything else does too", "Noticing how much my mood depends on rest.", 15, "yesterday"),
          t("s2", "Wind-down routines that stuck", "Sharing the small habits that helped.", 12, "a few days ago"),
        ],
      },
      {
        slug: "daily-wins",
        name: "Daily Wins & Small Victories",
        description: "Celebrate the small steps here.",
        threads: [
          t("w1", "Today I drank water and went outside", "Small. Real. Counts.", 34, "recently"),
          t("w2", "One thing I'm proud of this week", "Tiny brag thread — join in.", 27, "earlier today"),
        ],
      },
      {
        slug: "motivation-routines",
        name: "Motivation & Routines",
        description: "Building gentle structure.",
        threads: [
          t("mr1", "Routines that flex with bad days", "Plan A, Plan B, Plan rest.", 19, "yesterday"),
          t("mr2", "Habit stacking for low-energy people", "Linking new habits to ones I already do.", 14, "a few days ago"),
        ],
      },
    ],
  },
  {
    id: "experience-sharing",
    emoji: "💬",
    title: "Experience Sharing",
    subtitle: "Talk about what you're going through — no fixing required.",
    categories: [
      {
        slug: "sharing-my-story",
        name: "Sharing My Story",
        description: "Your story matters, even the messy parts.",
        threads: [
          t("ss1", "My first year in therapy", "What changed, what didn't.", 38, "yesterday"),
          t("ss2", "How I learned to ask for help", "It took longer than I'd like to admit.", 23, "a few days ago"),
        ],
      },
      {
        slug: "whats-on-my-mind",
        name: "What's on My Mind Today",
        description: "A thought-of-the-day kind of space.",
        threads: [
          t("wm1", "Heavy heart, gentle morning", "Trying to hold both.", 8, "recently"),
          t("wm2", "Overthinking a small text I sent", "Anyone else stuck on a tiny thing?", 17, "earlier today"),
        ],
      },
      {
        slug: "moments-of-hope",
        name: "Moments of Hope",
        description: "Small lights worth sharing.",
        threads: [
          t("mh1", "A moment I almost missed", "Sun on my face after a long week.", 25, "earlier today"),
          t("mh2", "Stranger kindness on the tram", "It made my whole day softer.", 19, "yesterday"),
        ],
      },
      {
        slug: "creative-expression",
        name: "Creative Expression",
        description: "Poems, art, journaling — share what helps you process.",
        threads: [
          t("ce1", "A poem about the in-between", "Wrote this after a hard week.", 14, "a few days ago"),
          t("ce2", "Journaling pages I keep returning to", "What I write when I can't talk.", 11, "a few days ago"),
        ],
      },
    ],
  },
  {
    id: "caregiver",
    emoji: "🧡",
    title: "Caregivers",
    subtitle: "For people supporting someone else.",
    categories: [
      {
        slug: "supporting-someone-else",
        name: "Supporting Someone Else",
        description: "Showing up without losing yourself.",
        threads: [
          t("c1s", "Being there without fixing", "Learning to just sit with them.", 16, "yesterday"),
          t("c2s", "What helped my friend most", "It wasn't advice — it was showing up.", 22, "a few days ago"),
        ],
      },
      {
        slug: "caregiver-stress",
        name: "Caregiver Stress & Boundaries",
        description: "You're allowed to need care too.",
        threads: [
          t("cs1", "When I started saying 'I can't tonight'", "It changed how I show up tomorrow.", 18, "earlier today"),
          t("cs2", "Compassion fatigue is real", "Naming it helped me ask for support.", 13, "a few days ago"),
        ],
      },
      {
        slug: "how-do-i-help",
        name: "How Do I Help?",
        description: "Practical questions, gentle answers.",
        threads: [
          t("hi1", "My partner won't talk about it", "Looking for ways to open the door, gently.", 21, "yesterday"),
          t("hi2", "What to say when they're crying", "A simple script that helped me.", 17, "a few days ago"),
        ],
      },
      {
        slug: "when-i-feel-helpless",
        name: "When I Feel Helpless",
        description: "For the moments you can't do enough.",
        threads: [
          t("wh1", "Sitting with my own helplessness", "Trying to let presence be enough.", 12, "yesterday"),
          t("wh2", "The grief of watching someone struggle", "Sharing what's helped me cope.", 9, "a few days ago"),
        ],
      },
    ],
  },
  {
    id: "identity-context",
    emoji: "🧭",
    title: "Identity & Context",
    subtitle: "Specific spaces — only if they fit you.",
    categories: [
      {
        slug: "students",
        name: "Students & Study Stress",
        description: "Exams, deadlines, and the weight in between.",
        threads: [
          t("st1", "Exam season anxiety", "How I'm pacing myself this round.", 24, "earlier today"),
          t("st2", "Thesis brain fog", "Tips that actually helped me focus.", 16, "yesterday"),
        ],
      },
      {
        slug: "work-career",
        name: "Work & Career Pressure",
        description: "When the job follows you home.",
        threads: [
          t("wc1", "Sunday-night dread", "Anyone else feel this every week?", 29, "yesterday"),
          t("wc2", "Setting boundaries with Slack", "Small changes that gave me my evenings back.", 18, "a few days ago"),
        ],
      },
      {
        slug: "relationships",
        name: "Relationships & Communication",
        description: "The people closest, the hardest conversations.",
        threads: [
          t("re1", "Hard conversations with family", "How I prepare without rehearsing too much.", 20, "yesterday"),
          t("re2", "Repair after a fight", "What made it feel safe again.", 15, "a few days ago"),
        ],
      },
      {
        slug: "expat-life",
        name: "Living Abroad / Expat Life",
        description: "Belonging when home is far away.",
        threads: [
          t("ex1", "Loneliness after moving to NL", "Trying to build roots in a new city.", 26, "earlier today"),
          t("ex2", "Missing home in small ways", "It hits at the strangest times.", 19, "a few days ago"),
        ],
      },
      {
        slug: "chronic-illness",
        name: "Chronic Illness & Mental Health",
        description: "Where body and mind meet.",
        threads: [
          t("ci1", "Pain days and mood dips", "How I separate the two — and when I can't.", 14, "yesterday"),
          t("ci2", "Pacing myself without guilt", "Learning that rest is productive too.", 12, "a few days ago"),
        ],
      },
    ],
  },
];

export const getCategoryBySlug = (slug: string): ForumCategory | undefined => {
  for (const group of FORUM_CATEGORY_GROUPS) {
    const found = group.categories.find((c) => c.slug === slug);
    if (found) return found;
  }
  return undefined;
};
