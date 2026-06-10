import { useMemo, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, GripVertical, ChevronLeft, BookOpen, FileText, Play, Wind, Sparkles, MessageCircle, Stethoscope } from "lucide-react";
import { saveQuiz, loadQuiz, hasQuiz, type StoredQuiz } from "@/lib/quiz-storage";
import {
  personalizedHeading,
  buildPersonalPicks,
  type FeedItem,
  type ItemType,
} from "@/lib/exploring-data";
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

const PICK_TYPE_STYLES: Record<ItemType, { tone: string; chipTone: string; Icon: typeof BookOpen }> = {
  Story: { tone: "border-peach/50 bg-peach/25 shadow-sm", chipTone: "bg-peach/60 text-charcoal", Icon: BookOpen },
  Article: { tone: "border-sage/50 bg-sage/25 shadow-sm", chipTone: "bg-sage/60 text-charcoal", Icon: FileText },
  Video: { tone: "border-lavender/50 bg-lavender/20 shadow-sm", chipTone: "bg-lavender/60 text-charcoal", Icon: Play },
  Exercise: { tone: "border-sage/50 bg-sage/25 shadow-sm", chipTone: "bg-sage/60 text-charcoal", Icon: Wind },
  Activity: { tone: "border-peach/50 bg-peach/25 shadow-sm", chipTone: "bg-peach/60 text-charcoal", Icon: Sparkles },
  Audio: { tone: "border-lavender/50 bg-lavender/20 shadow-sm", chipTone: "bg-lavender/60 text-charcoal", Icon: Play },
  Forum: { tone: "border-sage/50 bg-sage/25 shadow-sm", chipTone: "bg-sage/60 text-charcoal", Icon: MessageCircle },
  Support: { tone: "border-peach/50 bg-peach/25 shadow-sm", chipTone: "bg-peach/60 text-charcoal", Icon: Stethoscope },
};


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
      className="flex items-center gap-3 rounded-2xl border border-sage/50 bg-sage/25 shadow-sm px-4 py-3.5 cursor-grab active:cursor-grabbing touch-none select-none"
    >
      <GripVertical size={16} className="text-charcoal/60 flex-shrink-0" />
      <span className="text-sm font-medium text-charcoal">{index + 1}. {id}</span>
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
  const isUpdatingAnswers = params.get("edit") === "1";
  const [step, setStep] = useState(1);
  const [showIntro, setShowIntro] = useState(false);
  const [answers, setAnswers] = useState<QuizState>(() => {
    const stored = loadQuiz();
    return {
      situation:
        initialMode === "caregiver"
          ? "someone"
          : initialMode === "personal"
          ? "myself"
          : stored?.situation ?? "",
      hasDiagnosis: stored?.hasDiagnosis ?? "",
      diagnosis: stored?.diagnosis ?? "",
      sensitiveTopics: stored?.sensitiveTopics ?? [],
      priorities: stored?.priorities?.length ? stored.priorities : [...initialPriorities],
      currentState: stored?.currentState ?? "",
      timeEnergy: stored?.timeEnergy ?? "",
      supportStyle: stored?.supportStyle ?? "",
      caregiverNeed: stored?.caregiverNeed ?? "",
    };
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

  const storedQuiz: StoredQuiz = {
    situation: answers.situation as "myself" | "someone" | "",
    sensitiveTopics: answers.sensitiveTopics,
    priorities: answers.priorities,
    isCaregiver: isCareAbout,
    currentState: answers.currentState,
    timeEnergy: answers.timeEnergy,
    supportStyle: answers.supportStyle,
    caregiverNeed: answers.caregiverNeed,
    hasDiagnosis: answers.hasDiagnosis,
    diagnosis: answers.diagnosis,
  };

  if (hasQuiz() && !isUpdatingAnswers) {
    return <Navigate to="/your-space" replace />;
  }

  const finishQuiz = () => {
    saveQuiz(storedQuiz);
    setShowIntro(true);
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
      className={`w-full rounded-2xl border shadow-sm px-5 py-4 text-left transition-colors text-sm font-medium ${
        selected
          ? "border-stone-300 border-l-4 border-l-sage bg-lavender/50 text-charcoal"
          : "border-stone-300 bg-card text-charcoal hover:bg-sage/25"
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
              <h2 className="font-display text-2xl font-semibold text-charcoal">Your Situation</h2>
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
                    <p className="text-xs text-muted-foreground mb-2">You can share this only if you want. It helps us tailor information, but it's not required.</p>
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
              <h2 className="font-display text-2xl font-semibold text-charcoal">Sensitive or Triggering Content</h2>
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
              <h2 className="font-display text-2xl font-semibold text-charcoal">Your Priorities</h2>
              <p className="text-sm text-muted-foreground mt-1">Please drag these into the order that feels right for you:</p>
            </div>
            <div className="space-y-2">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={answers.priorities} strategy={verticalListSortingStrategy}>
                  {answers.priorities.map((item, idx) => (
                    <SortablePriority key={item} id={item} index={idx} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-charcoal">Your Current State</h2>
              <p className="text-sm text-muted-foreground mt-1">How are things for you right now?</p>
            </div>
            <div className="space-y-2">
              {[
                "I'm managing but want support",
                "I'm feeling overwhelmed",
                "I'm worried about someone else",
                "I'm looking for guidance",
                "I'm not sure how I'm feeling",
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
              <h2 className="font-display text-2xl font-semibold text-charcoal">Time & Energy</h2>
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
              <h2 className="font-display text-2xl font-semibold text-charcoal">Preferred Style of Support</h2>
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
              <h2 className="font-display text-2xl font-semibold text-charcoal">Caregiver Support</h2>
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

  if (showIntro) {
    const heading = personalizedHeading(storedQuiz);
    const picks = buildPersonalPicks(storedQuiz);
    return (
      <div className="relative min-h-screen flex flex-col max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-background overflow-hidden">
        <SoftBackdrop />
        <Header />
        <main className="flex-1 px-5 py-8 space-y-6">
          <div className="space-y-2">
            <p className="font-accent text-xs uppercase tracking-wider text-charcoal/55">A space, just for you</p>
            <h1 className="font-display text-3xl font-semibold text-charcoal leading-tight">
              {heading.title}
            </h1>
            {heading.sub && (
              <p className="text-sm text-charcoal/70 leading-relaxed">{heading.sub}</p>
            )}
          </div>

          <div className="space-y-3">
            {picks.map((item) => {
              const { tone, chipTone, Icon } = PICK_TYPE_STYLES[item.type];
              return (
                <article key={item.id} className={`rounded-2xl border ${tone} px-4 py-3.5`}>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-accent ${chipTone}`}>
                      <Icon size={10} />
                      {item.type}
                    </span>
                    {item.duration && (
                      <span className="font-accent text-[10px] text-charcoal/60">{item.duration}</span>
                    )}
                  </div>
                  <p className="font-display text-base font-semibold text-charcoal leading-snug mt-1.5">
                    {item.title}
                  </p>
                  <p className="font-accent text-[11px] text-charcoal/60 mt-0.5">{item.meta}</p>
                  <p className="text-xs text-charcoal/70 mt-2 leading-relaxed line-clamp-3">{item.blurb}</p>
                </article>
              );
            })}
          </div>

          <Button
            onClick={() => navigate("/your-space")}
            className="w-full rounded-full"
          >
            Take me there
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between font-accent text-xs text-charcoal/70">
            <span>Step {getStepNumber()} of {totalSteps}</span>
          </div>
          <div className="w-full h-2 bg-sage/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-lavender rounded-full transition-all duration-300"
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
            className="rounded-full border-sage/40 bg-card hover:bg-sage/25"
          >
            <ArrowLeft size={16} />
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 rounded-full"
          >
            {(step === totalSteps) ? "Finish" : "Continue"}
            {step < totalSteps && <ArrowRight size={16} className="ml-2" />}
          </Button>
        </div>

        {/* Skip for now */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigate("/exploring")}
            className="inline-flex flex-col items-center gap-0.5 rounded-2xl border border-peach/40 bg-peach/25 px-5 py-3 text-charcoal hover:bg-peach/25 transition-colors w-full"
          >
            <span className="text-sm font-accent font-semibold">Skip for now</span>
            <span className="text-xs text-charcoal/70">I want to explore freely</span>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
