const HeroSection = () => {
  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Mentaal is a calm place to explore what you or a loved one may be going through. We guide you toward support in a way that feels safe, private, and at your pace.
      </p>

      <div className="space-y-3">
        <button className="w-full rounded-xl border border-border bg-card px-5 py-5 text-left hover:bg-accent/50 transition-colors">
          <span className="font-display text-lg font-semibold text-card-foreground">I'm exploring</span>
        </button>
        <button className="w-full rounded-xl border border-border bg-card px-5 py-5 text-left hover:bg-accent/50 transition-colors">
          <span className="font-display text-lg font-semibold text-card-foreground">I need tailored support</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
