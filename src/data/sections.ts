// Shared section data. Each section maps to one of the 6 quiz priorities.
// Items can be tagged with sensitive topics so the tailored page can filter them.

export type SectionId =
  | "resources"
  | "tools"
  | "activities"
  | "forums"
  | "professional"
  | "caregiver";

export type SensitiveTopic =
  | "Self-harm"
  | "Suicide"
  | "Trauma"
  | "Substance use"
  | "Eating-related issues";

export type SectionItem = {
  title: string;
  description: string;
  topics?: SensitiveTopic[];
};

export type Section = {
  id: SectionId;
  title: string;
  icon: "book" | "tool" | "sparkles" | "message" | "stethoscope" | "heart";
  items: SectionItem[];
  footer?: { label: string; href?: string };
};

// Maps a quiz priority label -> one or more section ids (drives ordering on /tailored).
// Peer stories surfaces both Forums and Small Circle, since both are community-driven.
export const PRIORITY_TO_SECTION: Record<string, SectionId[]> = {
  "Understanding what's going on": ["resources"],
  "Practical tools and exercises": ["tools"],
  "Activities to feel better": ["activities"],
  "Resources and information": ["professional"],
  "Peer stories and experiences": ["forums", "caregiver"],
};

// Personal-mode content
export const PERSONAL_SECTIONS: Record<SectionId, Section> = {
  resources: {
    id: "resources",
    title: "Resources",
    icon: "book",
    items: [
      { title: "Stories", description: "Personal experiences shared by others on their journey." },
      { title: "Articles", description: "Informative reads on mental health topics and wellbeing." },
      { title: "Videos", description: "Watch and learn through guided visual content." },
    ],
    footer: { label: "Browse all resources →", href: "/resources" },
  },
  tools: {
    id: "tools",
    title: "Tools & Exercises",
    icon: "tool",
    items: [
      { title: "Breathing exercises", description: "Quick techniques to calm your nervous system." },
      { title: "Grounding practices", description: "Bring yourself back to the present moment.", topics: ["Trauma"] },
      { title: "Mood tracker", description: "Notice patterns in how you feel day to day." },
    ],
    footer: { label: "Browse all tools →", href: "/tools" },
  },
  activities: {
    id: "activities",
    title: "Activities to feel better",
    icon: "sparkles",
    items: [
      { title: "Gentle movement", description: "Short walks and stretches to lift your energy." },
      { title: "Creative outlets", description: "Journaling, drawing, and music for self-expression." },
      { title: "Connection prompts", description: "Small ways to reach out to people you care about." },
    ],
    footer: { label: "Browse all activities →", href: "/activities" },
  },
  forums: {
    id: "forums",
    title: "Forums",
    icon: "message",
    items: [
      { title: "Daily Wellbeing", description: "A soft space for everyday mental health." },
      { title: "Emotions & Coping", description: "A place to talk about feelings safely." },
      { title: "Life Challenges", description: "For experiences that affect mental wellbeing." },
    ],
    footer: { label: "More →", href: "/forums" },
  },
  professional: {
    id: "professional",
    title: "Professional Resources",
    icon: "stethoscope",
    items: [
      { title: "Find a therapist", description: "Search directories of licensed professionals." },
      { title: "Crisis lines", description: "Free, confidential support available 24/7.", topics: ["Suicide", "Self-harm"] },
      { title: "Treatment options", description: "Learn about therapy types and what to expect." },
    ],
  },
  caregiver: {
    id: "caregiver",
    title: "Small Circle",
    icon: "heart",
    items: [
      { title: "Support groups", description: "Connect with others caring for a loved one." },
      { title: "Self-care for caregivers", description: "Tools to protect your own wellbeing." },
    ],
  },
};

// Caregiver-mode content (same section ids, rewritten items)
export const CAREGIVER_SECTIONS: Record<SectionId, Section> = {
  resources: {
    id: "resources",
    title: "Understanding what they're going through",
    icon: "book",
    items: [
      { title: "Family stories", description: "How others have supported a loved one through hard times." },
      { title: "Articles for caregivers", description: "Plain-language guides on common conditions." },
      { title: "Videos", description: "Watch professionals explain what your loved one may experience." },
    ],
  },
  tools: {
    id: "tools",
    title: "How to support them",
    icon: "tool",
    items: [
      { title: "Conversation starters", description: "Gentle ways to open up difficult topics." },
      { title: "Crisis response", description: "What to do in difficult moments.", topics: ["Suicide", "Self-harm"] },
      { title: "Setting healthy boundaries", description: "Care without losing yourself." },
    ],
  },
  activities: {
    id: "activities",
    title: "Doing things together",
    icon: "sparkles",
    items: [
      { title: "Calming shared activities", description: "Low-pressure things you can do side by side." },
      { title: "Routines that help", description: "Small daily anchors that support wellbeing." },
    ],
  },
  forums: {
    id: "forums",
    title: "Caregiver Forums",
    icon: "message",
    items: [
      { title: "Caring for a partner", description: "Support from others in similar relationships." },
      { title: "Caring for a child", description: "Parents sharing what's working." },
      { title: "Caring for a friend", description: "When the person you love isn't family." },
    ],
    footer: { label: "More →", href: "/forums" },
  },
  professional: {
    id: "professional",
    title: "Where to find help",
    icon: "stethoscope",
    items: [
      { title: "Find a therapist for them", description: "Directories of licensed professionals." },
      { title: "Family therapy", description: "Working through challenges together." },
      { title: "Crisis lines", description: "24/7 support for you or your loved one.", topics: ["Suicide", "Self-harm"] },
    ],
  },
  caregiver: {
    id: "caregiver",
    title: "Taking care of yourself",
    icon: "heart",
    items: [
      { title: "Caregiver burnout", description: "Spotting the signs and what to do." },
      { title: "Caregiver support groups", description: "You are not alone in this." },
      { title: "Respite & rest", description: "Permission and ideas to recharge." },
    ],
  },
};

// Order used on /exploring: community sections (Forums, Small Circle) come last.
export const FIXED_ORDER: SectionId[] = [
  "resources",
  "tools",
  "activities",
  "professional",
  "forums",
  "caregiver",
];
