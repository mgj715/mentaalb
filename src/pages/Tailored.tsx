import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionBlock from "@/components/SectionBlock";
import { Button } from "@/components/ui/button";
import { CAREGIVER_SECTIONS, PERSONAL_SECTIONS, FIXED_ORDER, SensitiveTopic } from "@/data/sections";
import { loadQuiz, orderedSectionIds, filterByTopics } from "@/lib/quiz-storage";

const Tailored = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const quiz = loadQuiz();

  const isCaregiver =
    params.get("mode") === "caregiver" || quiz?.isCaregiver === true;

  const sectionsMap = isCaregiver ? CAREGIVER_SECTIONS : PERSONAL_SECTIONS;

  const orderedIds = useMemo(
    () => (quiz?.priorities?.length ? orderedSectionIds(quiz.priorities) : FIXED_ORDER),
    [quiz?.priorities],
  );

  const avoid = (quiz?.sensitiveTopics ?? []) as SensitiveTopic[];

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-background">
      <Header />
      <main className="flex-1 px-5 py-6 space-y-8">
        <div className="space-y-2">
          <h1 className="font-display text-xl font-semibold text-foreground">
            {isCaregiver ? "Small circle, tailored for you" : "Tailored for you"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {quiz?.priorities?.length
              ? "We've ordered these sections based on what matters most to you."
              : "Take the short quiz to personalize the order of these sections."}
          </p>
          {!quiz && (
            <Button
              variant="outline"
              className="rounded-xl mt-2"
              onClick={() => navigate("/quiz")}
            >
              Take the quiz
            </Button>
          )}
        </div>

        {orderedIds.map((id) => {
          const section = sectionsMap[id];
          const filtered = {
            ...section,
            items: filterByTopics(section.items, avoid),
          };
          return <SectionBlock key={id} section={filtered} />;
        })}
      </main>
      <Footer />
    </div>
  );
};

export default Tailored;
