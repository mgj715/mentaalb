import { useNavigate } from "react-router-dom";
import { Wind, Sparkles, Headphones, Play, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { AUDIO, BREATHING, GROUNDING } from "@/data/tools";

const Tools = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-charcoal">Tools & Exercises</h1>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Small practices to try in a quiet moment. Take what helps, leave the rest.
          </p>
        </div>

        {/* Breathing exercises */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage/50 text-charcoal">
              <Wind size={18} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Breathing exercises</h2>
          </div>
          <div className="space-y-2">
            {BREATHING.map((b) => (
              <article
                key={b.id}
                className="rounded-2xl border border-sage/30 bg-sage/15 px-4 py-3.5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-base font-semibold text-charcoal leading-snug">
                    {b.title}
                  </p>
                  <span className="font-accent text-[11px] uppercase tracking-wide text-charcoal/60 shrink-0">
                    {b.duration}
                  </span>
                </div>
                <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">{b.description}</p>
                <ol className="mt-2 space-y-1 text-xs text-charcoal/80 list-decimal list-inside">
                  {b.steps.map((s) => (
                    <li key={s} className="leading-relaxed">{s}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        {/* Grounding & coping tools */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-peach/50 text-charcoal">
              <Sparkles size={18} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Grounding & coping</h2>
          </div>
          <div className="space-y-2">
            {GROUNDING.map((g) => (
              <article
                key={g.id}
                className="rounded-2xl border border-peach/30 bg-peach/15 px-4 py-3.5"
              >
                <p className="font-accent text-[11px] uppercase tracking-wide text-charcoal/60">
                  {g.category}
                </p>
                <p className="font-display text-base font-semibold text-charcoal leading-snug mt-1">
                  {g.title}
                </p>
                <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">{g.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Guided audio (placeholders) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lavender/50 text-charcoal">
              <Headphones size={18} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Guided audio</h2>
          </div>
          <div className="space-y-3">
            {AUDIO.map((a) => (
              <article
                key={a.id}
                className="rounded-2xl border border-lavender/30 bg-lavender/15 overflow-hidden"
              >
                {/* Audio placeholder strip */}
                <div
                  className="relative h-24 w-full bg-gradient-to-br from-lavender/60 via-sage/40 to-peach/50 flex items-center justify-center"
                  role="img"
                  aria-label={`Audio placeholder for ${a.title}`}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-warm-white/80 text-charcoal shadow-sm">
                    <Play size={20} className="ml-0.5" />
                  </span>
                  <span className="absolute bottom-2 right-2 rounded-full bg-charcoal/70 px-2 py-0.5 text-[10px] font-accent text-warm-white">
                    {a.duration}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <p className="font-display text-base font-semibold text-charcoal leading-snug">
                    {a.title}
                  </p>
                  <p className="font-accent text-xs text-charcoal/60 mt-0.5">{a.guide}</p>
                  <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">{a.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
