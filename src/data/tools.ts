// Mock content for the Tools & Exercises page. Placeholders only.

export type Exercise = {
  id: string;
  title: string;
  duration: string;
  description: string;
  steps: string[];
};

export type Tool = {
  id: string;
  title: string;
  category: string;
  description: string;
};

export type AudioPlaceholder = {
  id: string;
  title: string;
  guide: string;
  description: string;
  duration: string;
};

export const BREATHING: Exercise[] = [
  {
    id: "b1",
    title: "Box breathing",
    duration: "2 min",
    description: "A simple square pattern to settle a racing mind.",
    steps: [
      "Inhale gently for 4 counts",
      "Hold for 4 counts",
      "Exhale slowly for 4 counts",
      "Hold for 4 counts, then repeat",
    ],
  },
  {
    id: "b2",
    title: "4–7–8 breath",
    duration: "3 min",
    description: "Lengthening the exhale signals safety to your body.",
    steps: [
      "Inhale through your nose for 4",
      "Hold the breath for 7",
      "Exhale through your mouth for 8",
      "Repeat for four cycles",
    ],
  },
  {
    id: "b3",
    title: "Soft belly breathing",
    duration: "5 min",
    description: "Reconnect with your body when you feel scattered.",
    steps: [
      "Place one hand on your belly",
      "Breathe in slowly, letting your belly rise",
      "Exhale gently, feeling it fall",
      "Stay here for a few minutes",
    ],
  },
];

export const GROUNDING: Tool[] = [
  {
    id: "g1",
    title: "5–4–3–2–1 senses",
    category: "Grounding",
    description:
      "Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
  },
  {
    id: "g2",
    title: "Cold water reset",
    category: "Grounding",
    description:
      "Splash cool water on your face or hold an ice cube to interrupt overwhelm.",
  },
  {
    id: "g3",
    title: "Name it to tame it",
    category: "Emotion regulation",
    description:
      "Quietly label what you're feeling. Putting words to it softens its grip.",
  },
  {
    id: "g4",
    title: "Mood tracker",
    category: "Self-awareness",
    description:
      "A gentle daily check-in to notice patterns in how you feel over time.",
  },
];

export const AUDIO: AudioPlaceholder[] = [
  {
    id: "a1",
    title: "Body scan meditation",
    guide: "Dr. Maya Okafor",
    description:
      "A slow, guided sweep through the body to release held tension.",
    duration: "10:24",
  },
  {
    id: "a2",
    title: "Letting go visualization",
    guide: "Iris Lindgren",
    description:
      "Imagine your worries as leaves on a stream, drifting gently by.",
    duration: "7:15",
  },
  {
    id: "a3",
    title: "Calm before sleep",
    guide: "Sam Reyes",
    description:
      "A soft wind-down practice for the moments before you close your eyes.",
    duration: "12:48",
  },
];
