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
          className="w-full rounded-xl border border-border bg-card px-5 py-5 text-left hover:bg-accent/50 transition-colors"
        >
          <span className="block font-display text-lg font-semibold text-card-foreground">I'm exploring</span>
          <span className="mt-1 block text-sm text-muted-foreground">Browse freely without answering questions</span>
        </button>

        <button
          onClick={() => navigate("/quiz")}
          className="w-full rounded-xl border border-border bg-card px-5 py-5 text-left hover:bg-accent/50 transition-colors"
        >
          <span className="block font-display text-lg font-semibold text-card-foreground">I need tailored support</span>
          <span className="mt-1 block text-sm text-muted-foreground">Get a personalized path based on your situation</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
