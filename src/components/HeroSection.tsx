import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="font-display text-4xl font-semibold leading-tight text-charcoal">
          A calm space to <em className="not-italic text-charcoal/70">begin</em>.
        </h1>
        <p className="text-sm text-charcoal/70 leading-relaxed">
          Mentaal is a soft place to explore what you or a loved one may be going through.
          We guide you toward support in a way that feels safe, private, and at your pace.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => navigate("/exploring")}
          className="group w-full rounded-3xl border border-sage/40 bg-sage/40 px-5 py-5 text-left transition-colors hover:bg-sage/60"
        >
          <span className="flex items-center justify-between gap-2">
            <span className="block font-display text-xl font-semibold text-charcoal">I'm exploring</span>
            <ArrowRight
              size={18}
              className="text-charcoal/70 transition-transform group-hover:translate-x-0.5"
            />
          </span>
          <span className="mt-1 block text-sm text-charcoal/70">Browse freely without answering questions</span>
        </button>

        <button
          onClick={() => navigate("/quiz")}
          className="group w-full rounded-3xl border border-lavender/40 bg-lavender/40 px-5 py-5 text-left transition-colors hover:bg-lavender/60"
        >
          <span className="flex items-center justify-between gap-2">
            <span className="block font-display text-xl font-semibold text-charcoal">I need tailored support</span>
            <ArrowRight
              size={18}
              className="text-charcoal/70 transition-transform group-hover:translate-x-0.5"
            />
          </span>
          <span className="mt-1 block text-sm text-charcoal/70">Get a personalized path based on your situation</span>
        </button>

        <div className="mx-auto h-1.5 w-24 rounded-full bg-peach/70" aria-hidden="true" />
      </div>
    </div>
  );
};

export default HeroSection;
