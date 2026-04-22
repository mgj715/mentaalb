// Mental health forum threads displayed on /forums.
// Each thread covers a different mental health topic.

export type ForumThread = {
  id: string;
  title: string;
  topic: string;
  excerpt: string;
  author: string;
  replies: number;
  lastActivity: string;
};

export const FORUM_THREADS: ForumThread[] = [
  {
    id: "anxiety-morning-spirals",
    title: "Morning anxiety spirals — what helps you?",
    topic: "Anxiety",
    excerpt: "Lately I wake up with my chest already tight. Looking for small rituals that help others ease into the day.",
    author: "quiet_dawn",
    replies: 24,
    lastActivity: "2h ago",
  },
  {
    id: "depression-low-energy-days",
    title: "Getting through low-energy days",
    topic: "Depression",
    excerpt: "Some days even brushing my teeth feels like a mountain. How do you give yourself credit for the small wins?",
    author: "soft_light",
    replies: 41,
    lastActivity: "5h ago",
  },
  {
    id: "burnout-recovery",
    title: "Recovering from burnout takes longer than I thought",
    topic: "Burnout",
    excerpt: "Three months off and I still feel hollow. Anyone else surprised by how slow this recovery is?",
    author: "tired_oak",
    replies: 18,
    lastActivity: "yesterday",
  },
  {
    id: "grief-waves",
    title: "Grief comes in waves — riding them",
    topic: "Grief & Loss",
    excerpt: "It's been a year and the waves still knock me down. Sharing what's helped me stay afloat.",
    author: "river_stones",
    replies: 32,
    lastActivity: "yesterday",
  },
  {
    id: "social-anxiety-small-talk",
    title: "Small talk feels impossible",
    topic: "Social Anxiety",
    excerpt: "Office kitchen conversations leave me drained for hours. Looking for gentle ways to practice.",
    author: "paper_crane",
    replies: 27,
    lastActivity: "2d ago",
  },
  {
    id: "sleep-and-mental-health",
    title: "When sleep slips, everything else does too",
    topic: "Sleep",
    excerpt: "Noticing how much my mood depends on rest. What routines actually stick for you?",
    author: "moon_quiet",
    replies: 15,
    lastActivity: "2d ago",
  },
  {
    id: "self-compassion-practice",
    title: "Talking to myself like a friend",
    topic: "Self-Compassion",
    excerpt: "I'm trying to swap my inner critic for an inner friend. It feels awkward but real.",
    author: "warm_hands",
    replies: 22,
    lastActivity: "3d ago",
  },
  {
    id: "panic-attacks-public",
    title: "Panic attacks in public spaces",
    topic: "Panic",
    excerpt: "Had one on the train last week. Sharing what grounded me and hoping to hear yours.",
    author: "still_water",
    replies: 19,
    lastActivity: "3d ago",
  },
  {
    id: "ocd-intrusive-thoughts",
    title: "Living alongside intrusive thoughts",
    topic: "OCD",
    excerpt: "Learning that the thoughts aren't me. It's slow work but something is shifting.",
    author: "open_window",
    replies: 13,
    lastActivity: "4d ago",
  },
  {
    id: "therapy-first-session",
    title: "What I wish I knew before my first therapy session",
    topic: "Therapy",
    excerpt: "A small list for anyone nervous about starting. You don't have to have the right words.",
    author: "first_step",
    replies: 38,
    lastActivity: "5d ago",
  },
  {
    id: "loneliness-after-move",
    title: "Loneliness after moving cities",
    topic: "Loneliness",
    excerpt: "New place, no roots yet. How did you build a sense of belonging again?",
    author: "new_address",
    replies: 26,
    lastActivity: "1w ago",
  },
  {
    id: "body-image-recovery",
    title: "Making peace with my body",
    topic: "Body Image",
    excerpt: "Years of fighting my reflection. Slowly learning neutrality before love.",
    author: "soft_mirror",
    replies: 17,
    lastActivity: "1w ago",
  },
];
