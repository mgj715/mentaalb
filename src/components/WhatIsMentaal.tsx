const WhatIsMentaal = () => {
  return (
    <section className="rounded-3xl border border-sage/50 bg-card overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">What is Mentaal?</h2>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Mentaal is a mental health support platform that connects you with the right resources, professionals and communities, all in one place. Whether you need help yourself or want to support someone close to you, we're here to guide you.
          </p>
        </div>
        <div className="flex-1 bg-lavender/40 flex items-center justify-center min-h-[180px] p-5">
          <div className="w-full aspect-video bg-warm-white/80 rounded-2xl flex items-center justify-center border border-lavender/40">
            <span className="font-accent text-xs text-charcoal/60">▶ Video</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsMentaal;
