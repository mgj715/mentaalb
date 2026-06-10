import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, BookOpen, FileText, Play, Wind, Sparkles, MessageCircle, Stethoscope } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";

import { markStageVisited } from "@/components/CaregiverJourney";
import { CAREGIVER_STAGES, stageContent, type FeedItem, type ItemType } from "@/lib/exploring-data";

const TYPE_STYLES: Record<ItemType, { tone: string; chipTone: string; Icon: typeof BookOpen }> = {
  Story: { tone: "border-lavender/40 bg-lavender/25 shadow-sm", chipTone: "bg-lavender/60 text-charcoal", Icon: BookOpen },
  Article: { tone: "border-lavender/40 bg-lavender/25 shadow-sm", chipTone: "bg-lavender/60 text-charcoal", Icon: FileText },
  Video: { tone: "border-lavender/40 bg-lavender/25 shadow-sm", chipTone: "bg-lavender/60 text-charcoal", Icon: Play },
  Exercise: { tone: "border-sage/40 bg-sage/25 shadow-sm", chipTone: "bg-sage/60 text-charcoal", Icon: Wind },
  Activity: { tone: "border-sage/40 bg-sage/25 shadow-sm", chipTone: "bg-sage/60 text-charcoal", Icon: Sparkles },
  Audio: { tone: "border-sage/40 bg-sage/25 shadow-sm", chipTone: "bg-sage/60 text-charcoal", Icon: Play },
  Forum: { tone: "border-peach/40 bg-peach/25 shadow-sm", chipTone: "bg-peach/60 text-charcoal", Icon: MessageCircle },
  Support: { tone: "border-peach/40 bg-peach/25 shadow-sm", chipTone: "bg-peach/60 text-charcoal", Icon: Stethoscope },
};

const Card = ({ item }: { item: FeedItem }) => {
  const { tone, chipTone, Icon } = TYPE_STYLES[item.type];
  const crisis = /crisis/i.test(item.title);
  if (crisis) {
    return (
      <article className="rounded-2xl bg-[#1e2329] px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-accent bg-warm-white/15 text-warm-white">
            <Icon size={10} />
            {item.type}
          </span>
          {item.duration && (
            <span className="font-accent text-[10px] text-warm-white/65">{item.duration}</span>
          )}
        </div>
        <p className="font-display text-base font-semibold text-warm-white leading-snug mt-1.5">
          {item.title}
        </p>
        <p className="font-accent text-[11px] text-warm-white/65 mt-0.5">{item.meta}</p>
        <p className="text-xs text-warm-white/80 mt-2 leading-relaxed">{item.blurb}</p>
      </article>
    );
  }
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
      <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">{item.blurb}</p>
    </article>
  );
};

const CaregiverStage = () => {
  const { stage } = useParams<{ stage: string }>();
  const navigate = useNavigate();
  const meta = useMemo(() => CAREGIVER_STAGES.find((s) => s.id === stage), [stage]);
  const items = useMemo(() => (meta ? stageContent(meta.id) : []), [meta]);

  useEffect(() => {
    if (meta) markStageVisited(meta.id);
  }, [meta]);

  if (!meta) {
    return (
      <div className="relative min-h-screen flex flex-col max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-background overflow-hidden">
        <SoftBackdrop />
        <Header />
        <main className="flex-1 px-5 py-6 space-y-4">
          <button
            onClick={() => navigate("/your-space")}
            className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <p className="text-sm text-charcoal/70">Stage not found.</p>
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
        <Link
          to="/your-space"
          className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={16} />
          Back to your space
        </Link>
        <div className="space-y-2">
          <p className="font-accent text-xs uppercase tracking-wider text-charcoal/55">
            Your path · Stage {CAREGIVER_STAGES.findIndex((s) => s.id === meta.id) + 1}
          </p>
          <h1 className="font-display text-2xl font-semibold text-charcoal leading-snug">
            {meta.title}
          </h1>
          <p className="text-sm text-charcoal/70 leading-relaxed">{meta.description}</p>
        </div>

        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-charcoal/60">More content coming to this stage soon.</p>
          ) : (
            items.map((it) => <Card key={it.id} item={it} />)
          )}
        </div>

        {meta.id === "self-care" && (
          <div className="space-y-2">
            <h2 className="font-display text-lg font-semibold text-charcoal">Small Circle</h2>
            <p className="text-xs text-charcoal/70">
              A small support group for people caring for someone they love.
            </p>
            <Link
              to="/small-circle"
              className="inline-flex items-center gap-1 text-sm font-accent text-charcoal hover:underline"
            >
              Visit Small Circle →
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CaregiverStage;
