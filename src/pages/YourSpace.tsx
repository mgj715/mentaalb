import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, Play, Wind, Sparkles, MessageCircle, Stethoscope, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import CaregiverJourney from "@/components/CaregiverJourney";
import PatientJourney from "@/components/PatientJourney";
import { loadQuiz, clearQuiz } from "@/lib/quiz-storage";
import {
  buildPersonalPicks,
  personalSpaceHeader,
  type FeedItem,
  type ItemType,
} from "@/lib/exploring-data";

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

const PickCard = ({ item }: { item: FeedItem }) => {
  const { tone, chipTone, Icon } = PICK_TYPE_STYLES[item.type];
  return (
    <article className={`rounded-2xl border ${tone} px-4 py-3.5`}>
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
};

const YourSpace = () => {
  const navigate = useNavigate();
  const quiz = useMemo(() => loadQuiz(), []);
  const [offset, setOffset] = useState(0);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const heading = useMemo(() => personalSpaceHeader(quiz), [quiz]);
  const picks = useMemo(() => buildPersonalPicks(quiz, offset), [quiz, offset]);

  const handleStartFresh = () => {
    clearQuiz();
    window.location.href = "/";
  };

  return (
    <div className="relative min-h-screen flex flex-col max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-8 space-y-8">
        <div className="space-y-2">
          <p className="font-accent text-xs uppercase tracking-wider text-charcoal/55">Your Space</p>
          <h1 className="font-display text-3xl font-semibold text-charcoal leading-tight">
            {heading.title}
          </h1>
          {heading.sub && (
            <p className="text-sm text-charcoal/70 leading-relaxed">{heading.sub}</p>
          )}
        </div>

        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-semibold text-charcoal">
              A few things we thought might help
            </h2>
            <button
              onClick={() => setOffset((o) => o + 1)}
              className="inline-flex items-center gap-1 font-accent text-[11px] text-charcoal/60 hover:text-charcoal transition-colors"
              aria-label="Refresh picks"
            >
              <RefreshCw size={11} />
              refresh
            </button>
          </div>
          <div className="space-y-3">
            {picks.map((item) => (
              <PickCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {quiz?.isCaregiver && <CaregiverJourney />}

        <div className="pt-2">
          <div className="h-px bg-stone/50" />
          <p className="pt-6 text-center font-accent text-xs text-charcoal/55">
            New to Mentaal or want to learn more?{" "}
            <a href="/about" className="underline hover:text-charcoal transition-colors">
              About Mentaal
            </a>
          </p>
          <div className="pt-6 text-center space-y-3">
            <p className="font-display text-base text-charcoal/80">Want to wander further?</p>
            <Button
              onClick={() => navigate("/exploring")}
              variant="outline"
              className="rounded-full"
            >
              Explore freely
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
          <div className="pt-6 text-center">
            <button
              onClick={() => setPrefsOpen(true)}
              className="font-accent text-xs text-charcoal/55 hover:text-charcoal transition-colors"
            >
              Update your preferences →
            </button>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={prefsOpen} onOpenChange={(o) => { setPrefsOpen(o); if (!o) setConfirmReset(false); }}>
        <DialogContent className="max-w-sm bg-warm-white border-sage/50 rounded-2xl">
          {!confirmReset ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl text-charcoal text-left">
                  Update your space
                </DialogTitle>
                <DialogDescription className="text-sm text-charcoal/70 text-left">
                  Adjust what's here, or start over.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  onClick={() => { setPrefsOpen(false); navigate("/quiz?edit=1"); }}
                  className="w-full rounded-full"
                >
                  Update my answers
                </Button>
                <Button
                  onClick={() => setConfirmReset(true)}
                  variant="outline"
                  className="w-full rounded-full"
                >
                  Start fresh
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl text-charcoal text-left">
                  Are you sure?
                </DialogTitle>
                <DialogDescription className="text-sm text-charcoal/70 text-left">
                  This will reset your space. You'll start fresh, like the first time you visited. Are you sure?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0 mt-2">
                <Button onClick={handleStartFresh} className="w-full rounded-full">
                  Yes, start fresh
                </Button>
                <Button
                  onClick={() => { setPrefsOpen(false); setConfirmReset(false); }}
                  variant="outline"
                  className="w-full rounded-full"
                >
                  Never mind
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YourSpace;
