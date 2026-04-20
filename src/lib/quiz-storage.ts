import { PRIORITY_TO_SECTION, SectionId, SensitiveTopic, FIXED_ORDER } from "@/data/sections";

export type StoredQuiz = {
  situation: "myself" | "someone" | "";
  sensitiveTopics: string[];
  priorities: string[]; // ordered list of priority labels
  isCaregiver: boolean;
};

const KEY = "mentaal.quiz.v1";

export const saveQuiz = (q: StoredQuiz) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(q));
  } catch {
    // ignore
  }
};

export const loadQuiz = (): StoredQuiz | null => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredQuiz;
  } catch {
    return null;
  }
};

// Build the ordered list of section ids from quiz priorities, with any
// missing sections appended in the fixed order so we always render all 6.
export const orderedSectionIds = (priorities: string[]): SectionId[] => {
  const mapped = priorities
    .map((p) => PRIORITY_TO_SECTION[p])
    .filter((s): s is SectionId => Boolean(s));
  const seen = new Set(mapped);
  for (const s of FIXED_ORDER) if (!seen.has(s)) mapped.push(s);
  return mapped;
};

export const filterByTopics = <T extends { topics?: SensitiveTopic[] }>(
  items: T[],
  avoid: string[],
): T[] => {
  if (!avoid.length || avoid.includes("None of the above")) return items;
  return items.filter(
    (item) => !item.topics?.some((t) => avoid.includes(t)),
  );
};
