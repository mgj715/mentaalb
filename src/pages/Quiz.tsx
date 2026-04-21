import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, GripVertical } from "lucide-react";
import { saveQuiz } from "@/lib/quiz-storage";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortablePriority = ({ id, index }: { id: string; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 cursor-grab active:cursor-grabbing touch-none select-none"
    >
      <GripVertical size={16} className="text-muted-foreground flex-shrink-0" />
      <span className="text-sm font-medium text-card-foreground">{index + 1}. {id}</span>
    </div>
  );
};

type QuizState = {
  situation: string;
  hasDiagnosis: string;
  diagnosis: string;
  sensitiveTopics: string[];
  priorities: string[];
  currentState: string;
  timeEnergy: string;
  supportStyle: string;
  caregiverNeed: string;
};

const initialPriorities = [
  "Understanding what's going on",
  "Practical tools and exercises",
  "Activities to feel better",
  "Resources and information",
  "Peer stories and experiences",
];

const Quiz = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialMode = params.get("mode"); // "personal" | "caregiver" | null
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizState>({
    situation: initialMode === "caregiver" ? "someone" : initialMode === "personal" ? "myself" : "",
    hasDiagnosis: "",
    diagnosis: "",
    sensitiveTopics: [],
    priorities: [...initialPriorities],
    currentState: "",
    timeEnergy: "",
    supportStyle: "",
    caregiverNeed: "",
  });
  

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = answers.priorities.indexOf(active.id as string);
      const newIndex = answers.priorities.indexOf(over.id as string);
      setAnswers({ ...answers, priorities: arrayMove(answers.priorities, oldIndex, newIndex) });
    }
  };

  const isCareAbout = answers.situation === "someone";

  const totalSteps = isCareAbout ? 7 : 6;

  const getStepNumber = () => {
    // Map internal step to display step
    if (step <= 6) return step;
    return 7;
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        if (!answers.situation) return false;
        if (answers.situation === "myself" && !answers.hasDiagnosis) return false;
        return true;
      case 2: return answers.sensitiveTopics.length > 0;
      case 3: return true;
      case 4: return !!answers.currentState;
      case 5: return !!answers.timeEnergy;
      case 6: return !!answers.supportStyle;
      case 7: return !!answers.caregiverNeed;
      default: return false;
    }
  };

  const finishQuiz = () => {
    saveQuiz({
      situation: (answers.situation as "myself" | "someone" | ""),
      sensitiveTopics: answers.sensitiveTopics,
      priorities: answers.priorities,
      isCaregiver: isCareAbout,
    });
    navigate(`/tailored?mode=${isCareAbout ? "caregiver" : "personal"}`);
  };

  const handleNext = () => {
    if ((step === 6 && !isCareAbout) || step === 7) {
      finishQuiz();
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/");
    } else {
      setStep(step - 1);
    }
  };

  const toggleSensitiveTopic = (topic: string) => {
    if (topic === "None of the above") {
      setAnswers({ ...answers, sensitiveTopics: ["None of the above"] });
      return;
    }
    const filtered = answers.sensitiveTopics.filter((t) => t !== "None of the above");
    if (filtered.includes(topic)) {
      setAnswers({ ...answers, sensitiveTopics: filtered.filter((t) => t !== topic) });
    } else {
      setAnswers({ ...answers, sensitiveTopics: [...filtered, topic] });
    }
  };


  const OptionButton = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border px-5 py-4 text-left transition-colors text-sm font-medium ${
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-card text-card-foreground hover:bg-accent/50"
      }`}
    >
      {label}
    </button>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Your Situation</h2>
              <p className="text-sm text-muted-foreground mt-1">What describes your situation best?</p>
            </div>
            <div className="space-y-2">
              <OptionButton
                label="I'm dealing with mental-health challenges myself"
                selected={answers.situation === "myself"}
                onClick={() => setAnswers({ ...answers, situation: "myself", hasDiagnosis: "", diagnosis: "" })}
              />
              <OptionButton
                label="Someone I care about is dealing with mental-health challenges"
                selected={answers.situation === "someone"}
                onClick={() => setAnswers({ ...answers, situation: "someone", hasDiagnosis: "", diagnosis: "" })}
              />
            </div>

            {answers.situation === "myself" && (
              <div className="space-y-3 pt-2">
                <p className="text-sm font-medium text-foreground">Do you have a diagnosis?</p>
                <div className="space-y-2">
                  <OptionButton label="Yes" selected={answers.hasDiagnosis === "yes"} onClick={() => setAnswers({ ...answers, hasDiagnosis: "yes" })} />
                  <OptionButton label="No" selected={answers.hasDiagnosis === "no"} onClick={() => setAnswers({ ...answers, hasDiagnosis: "no" })} />
                  <OptionButton label="I'm not sure" selected={answers.hasDiagnosis === "unsure"} onClick={() => setAnswers({ ...answers, hasDiagnosis: "unsure" })} />
                </div>
                {answers.hasDiagnosis === "yes" && (
                  <div className="pt-1">
                    <p className="text-sm text-muted-foreground mb-2">Please share your diagnosis (optional):</p>
                    <Textarea
                      value={answers.diagnosis}
                      onChange={(e) => setAnswers({ ...answers, diagnosis: e.target.value })}
                      placeholder="Type here..."
                      className="bg-card border-border"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Sensitive or Triggering Content</h2>
              <p className="text-sm text-muted-foreground mt-1">Are there topics you prefer not to see?</p>
            </div>
            <div className="space-y-2">
              {["Self-harm", "Suicide", "Trauma", "Substance use", "Eating-related issues", "None of the above"].map((topic) => (
                <OptionButton
                  key={topic}
                  label={topic}
                  selected={answers.sensitiveTopics.includes(topic)}
                  onClick={() => toggleSensitiveTopic(topic)}
                />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Your Priorities</h2>
              <p className="text-sm text-muted-foreground mt-1">Please drag these into the order that feels right for you:</p>
            </div>
            <div className="space-y-2">
              {answers.priorities.map((item, idx) => (
                <div
                  key={item}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={() => setDraggedIdx(null)}
                  className={`flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 cursor-grab active:cursor-grabbing transition-colors ${
                    draggedIdx === idx ? "opacity-50" : ""
                  }`}
                >
                  <GripVertical size={16} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-sm font-medium text-card-foreground">{idx + 1}. {item}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Your Current State</h2>
              <p className="text-sm text-muted-foreground mt-1">How are things for you right now?</p>
            </div>
            <div className="space-y-2">
              {[
                "I'm managing but want support",
                "I'm feeling overwhelmed",
                "I'm worried about someone else",
                "I'm looking for guidance",
                "I don't know where to start",
              ].map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={answers.currentState === option}
                  onClick={() => setAnswers({ ...answers, currentState: option })}
                />
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Time & Energy</h2>
              <p className="text-sm text-muted-foreground mt-1">How much time do you have today?</p>
            </div>
            <div className="space-y-2">
              {["1 minute", "5 minutes", "10 minutes", "More time"].map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={answers.timeEnergy === option}
                  onClick={() => setAnswers({ ...answers, timeEnergy: option })}
                />
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Preferred Style of Support</h2>
              <p className="text-sm text-muted-foreground mt-1">What style of support works best for you?</p>
            </div>
            <div className="space-y-2">
              {[
                "Short, practical tips",
                "Step-by-step guidance",
                "Calm explanations",
                "Activities and exercises",
                "Stories from others",
                "Professional resources",
              ].map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={answers.supportStyle === option}
                  onClick={() => setAnswers({ ...answers, supportStyle: option })}
                />
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Caregiver Support</h2>
              <p className="text-sm text-muted-foreground mt-1">What do you need most right now?</p>
            </div>
            <div className="space-y-2">
              {[
                "Understanding what they might be going through",
                "How to support them",
                "How to take care of myself",
                "What to do in difficult moments",
                "Where to find help",
              ].map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  selected={answers.caregiverNeed === option}
                  onClick={() => setAnswers({ ...answers, caregiverNeed: option })}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-background">
      <Header />
      <main className="flex-1 px-5 py-6 space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Step {getStepNumber()} of {totalSteps}</span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(getStepNumber() / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={handleBack}
            className="rounded-xl border-border"
          >
            <ArrowLeft size={16} />
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 rounded-xl"
          >
            {(step === totalSteps) ? "Finish" : "Continue"}
            {step < totalSteps && <ArrowRight size={16} className="ml-2" />}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
