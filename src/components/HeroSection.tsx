import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Mentaal is a calm place to explore what you or a loved one may be going through. We guide you toward support in a way that feels safe, private, and at your pace.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => navigate("/exploring")}
          className="group w-full rounded-xl border border-sage/40 bg-sage/30 px-5 py-5 text-left transition-colors hover:bg-sage/50 hover:border-sage"
        >
          <span className="block font-display text-lg font-semibold text-charcoal">I'm exploring</span>
          <span className="mt-1 block text-sm text-charcoal/70">Browse freely without answering questions</span>
        </button>

        <button
          onClick={() => navigate("/quiz")}
          className="group w-full rounded-xl border border-lavender/40 bg-lavender/30 px-5 py-5 text-left transition-colors hover:bg-lavender/50 hover:border-lavender"
        >
          <span className="block font-display text-lg font-semibold text-charcoal">I need tailored support</span>
          <span className="mt-1 block text-sm text-charcoal/70">Get a personalized path based on your situation</span>
        </button>

        <div className="h-1 w-full rounded-full bg-peach/60" aria-hidden="true" />
      </div>
    </div>
  );
};

export default HeroSection;
