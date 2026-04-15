const WhatIsMentaal = () => {
  return (
    <section className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-5 flex flex-col justify-center">
          <h2 className="font-display text-lg font-semibold text-card-foreground mb-2">What is Mentaal?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mentaal is a mental health support platform that connects you with the right resources, professionals and communities, all in one place. Whether you need help yourself or want to support someone close to you, we're here to guide you.
          </p>
        </div>
        <div className="flex-1 bg-muted flex items-center justify-center min-h-[180px] p-4">
          <div className="w-full aspect-video bg-foreground/10 rounded-lg flex items-center justify-center border border-border">
            <span className="text-xs text-muted-foreground">▶ Video</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsMentaal;
