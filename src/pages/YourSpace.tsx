import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, Play, Wind, Sparkles, MessageCircle, Stethoscope, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { Button } from "@/components/ui/button";
import CaregiverJourney from "@/components/CaregiverJourney";
import { loadQuiz } from "@/lib/quiz-storage";
import {
  buildPersonalPicks,
  personalSpaceHeader,
  type FeedItem,
  type ItemType,
} from "@/lib/exploring-data";

const PICK_TYPE_STYLES: Record<ItemType, { tone: string; chipTone: string; Icon: typeof BookOpen }> = {
  Story: { tone: "border-peach/30 bg-peach/15", chipTone: "bg-peach/60 text-charcoal", Icon: BookOpen },
  Article: { tone: "border-sage/30 bg-sage/15", chipTone: "bg-sage/60 text-charcoal", Icon: FileText },
  Video: { tone: "border-lavender/30 bg-lavender/15", chipTone: "bg-lavender/60 text-charcoal", Icon: Play },
  Exercise: { tone: "border-sage/30 bg-sage/15", chipTone: "bg-sage/60 text-charcoal", Icon: Wind },
  Activity: { tone: "border-peach/30 bg-peach/15", chipTone: "bg-peach/60 text-charcoal", Icon: Sparkles },
  Audio: { tone: "border-lavender/30 bg-lavender/15", chipTone: "bg-lavender/60 text-charcoal", Icon: Play },
  Forum: { tone: "border-sage/30 bg-sage/15", chipTone: "bg-sage/60 text-charcoal", Icon: MessageCircle },
  Support: { tone: "border-peach/30 bg-peach/15", chipTone: "bg-peach/60 text-charcoal", Icon: Stethoscope },
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

  const heading = useMemo(() => personalSpaceHeader(quiz), [quiz]);
  const picks = useMemo(() => buildPersonalPicks(quiz, offset), [quiz, offset]);

  return (
    <div className="relative min-h-screen flex flex-col max-w-md mx-auto bg-background overflow-hidden">
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

        <div className="pt-2">
          <div className="h-px bg-stone/50" />
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default YourSpace;
