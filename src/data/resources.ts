// Mock content for the Resources page. Not real media — placeholders only.

export type Story = {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  readTime: string;
};

export type Article = {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
};

export type VideoPlaceholder = {
  id: string;
  title: string;
  speaker: string;
  description: string;
  duration: string;
};

export const STORIES: Story[] = [
  {
    id: "s1",
    title: "The morning I asked for help",
    author: "Noor, 28",
    excerpt:
      "For months I told myself it would pass. Writing this is the first time I've said out loud that it didn't.",
    readTime: "4 min read",
  },
  {
    id: "s2",
    title: "Learning to sit with anxiety",
    author: "Liam, 34",
    excerpt:
      "I used to fight every wave. A small breathing practice taught me to let it move through me instead.",
    readTime: "6 min read",
  },
  {
    id: "s3",
    title: "Coming home to myself after burnout",
    author: "Amara, 41",
    excerpt:
      "Rest felt like failure for a long time. Here's what changed when I finally allowed it.",
    readTime: "5 min read",
  },
  {
    id: "s4",
    title: "What grief taught me about gentleness",
    author: "Theo, 23",
    excerpt:
      "Losing my brother cracked everything open. Slowly, I'm finding softer ways to carry it.",
    readTime: "7 min read",
  },
];

export const ARTICLES: Article[] = [
  {
    id: "a1",
    title: "Understanding the difference between sadness and depression",
    category: "Mental health basics",
    summary:
      "A plain-language guide to noticing when low moods may be asking for more support.",
    readTime: "5 min read",
  },
  {
    id: "a2",
    title: "How sleep shapes your emotional resilience",
    category: "Wellbeing",
    summary:
      "What happens in your brain at night, and small habits that protect your rest.",
    readTime: "8 min read",
  },
  {
    id: "a3",
    title: "Talking to someone you love about therapy",
    category: "Relationships",
    summary:
      "Gentle scripts and what to avoid when opening a conversation about getting help.",
    readTime: "6 min read",
  },
  {
    id: "a4",
    title: "Why self-compassion works better than self-criticism",
    category: "Inner work",
    summary:
      "The science behind being kind to yourself — and how to actually practice it.",
    readTime: "7 min read",
  },
];

export const VIDEOS: VideoPlaceholder[] = [
  {
    id: "v1",
    title: "A 3-minute grounding practice",
    speaker: "Dr. Maya Okafor, Psychologist",
    description:
      "A short guided exercise to bring you back to the present when your thoughts start racing.",
    duration: "3:12",
  },
  {
    id: "v2",
    title: "What anxiety actually is",
    speaker: "Sam Reyes, Therapist",
    description:
      "An approachable explainer on the body's alarm system — and why it isn't a sign you're broken.",
    duration: "6:48",
  },
  {
    id: "v3",
    title: "Building a tiny daily check-in",
    speaker: "Iris Lindgren, Coach",
    description:
      "A two-question ritual that helps you notice how you really feel, in under a minute.",
    duration: "4:25",
  },
  {
    id: "v4",
    title: "Talking to a friend who's struggling",
    speaker: "Dr. Jonas Hale, Counsellor",
    description:
      "What to say, what to skip, and how presence often matters more than the perfect words.",
    duration: "8:02",
  },
];
