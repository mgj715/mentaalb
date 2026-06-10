import { useNavigate } from "react-router-dom";
import { Footprints, Palette, Heart, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { MOVEMENT, CREATIVE, CONNECTION } from "@/data/activities";

const Activities = () => {
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
          <h1 className="font-display text-3xl font-semibold text-charcoal">Activities to feel better</h1>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Small, doable things that can gently shift your mood. No pressure — pick whatever feels right.
          </p>
        </div>

        {/* Gentle movement */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage/50 text-charcoal">
              <Footprints size={18} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Gentle movement</h2>
          </div>
          <div className="space-y-2">
            {MOVEMENT.map((m) => (
              <article key={m.id} className="rounded-2xl border border-sage/40 bg-sage/25 shadow-sm px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-base font-semibold text-charcoal leading-snug">{m.title}</p>
                  <span className="font-accent text-[11px] uppercase tracking-wide text-charcoal/60 shrink-0">{m.duration}</span>
                </div>
                <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">{m.description}</p>
                <ul className="mt-2 space-y-1 text-xs text-charcoal/80 list-disc list-inside">
                  {m.tips.map((t) => (
                    <li key={t} className="leading-relaxed">{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Creative outlets */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lavender/50 text-charcoal">
              <Palette size={18} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Creative outlets</h2>
          </div>
          <div className="space-y-2">
            {CREATIVE.map((c) => (
              <article key={c.id} className="rounded-2xl border border-sage/40 bg-sage/25 shadow-sm px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-base font-semibold text-charcoal leading-snug">{c.title}</p>
                  <span className="font-accent text-[11px] uppercase tracking-wide text-charcoal/60 shrink-0">{c.duration}</span>
                </div>
                <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">{c.description}</p>
                <ul className="mt-2 space-y-1 text-xs text-charcoal/80 list-disc list-inside">
                  {c.tips.map((t) => (
                    <li key={t} className="leading-relaxed">{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Connection prompts */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-peach/50 text-charcoal">
              <Heart size={18} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Connection prompts</h2>
          </div>
          <div className="space-y-2">
            {CONNECTION.map((cn) => (
              <article key={cn.id} className="rounded-2xl border border-sage/40 bg-sage/25 shadow-sm px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-base font-semibold text-charcoal leading-snug">{cn.title}</p>
                  <span className="font-accent text-[11px] uppercase tracking-wide text-charcoal/60 shrink-0">{cn.duration}</span>
                </div>
                <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">{cn.description}</p>
                <ul className="mt-2 space-y-1 text-xs text-charcoal/80 list-disc list-inside">
                  {cn.tips.map((t) => (
                    <li key={t} className="leading-relaxed">{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Activities;
