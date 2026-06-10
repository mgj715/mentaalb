import { useNavigate } from "react-router-dom";
import { Play, BookOpen, FileText, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { ARTICLES, STORIES, VIDEOS } from "@/data/resources";

const Resources = () => {
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
          <h1 className="font-display text-3xl font-semibold text-charcoal">Resources</h1>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Stories, articles, and short videos to read or watch at your own pace.
          </p>
        </div>

        {/* Stories */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-peach/50 text-charcoal">
              <BookOpen size={18} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Stories</h2>
          </div>
          <div className="space-y-2">
            {STORIES.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl border border-lavender/40 bg-lavender/25 shadow-sm px-4 py-3.5"
              >
                <p className="font-display text-base font-semibold text-charcoal leading-snug">
                  {s.title}
                </p>
                <p className="font-accent text-xs text-charcoal/60 mt-0.5">
                  {s.author} · {s.readTime}
                </p>
                <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">{s.excerpt}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Articles */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage/50 text-charcoal">
              <FileText size={18} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Articles</h2>
          </div>
          <div className="space-y-2">
            {ARTICLES.map((a) => (
              <article
                key={a.id}
                className="rounded-2xl border border-lavender/40 bg-lavender/25 shadow-sm px-4 py-3.5"
              >
                <p className="font-accent text-[11px] uppercase tracking-wide text-charcoal/60">
                  {a.category} · {a.readTime}
                </p>
                <p className="font-display text-base font-semibold text-charcoal leading-snug mt-1">
                  {a.title}
                </p>
                <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">{a.summary}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Videos (placeholders) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lavender/50 text-charcoal">
              <Play size={18} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Videos</h2>
          </div>
          <div className="space-y-3">
            {VIDEOS.map((v) => (
              <article
                key={v.id}
                className="rounded-2xl border border-lavender/40 bg-lavender/25 shadow-sm overflow-hidden"
              >
                {/* Video placeholder thumbnail */}
                <div
                  className="relative aspect-video w-full bg-gradient-to-br from-lavender/60 via-sage/40 to-peach/50 flex items-center justify-center"
                  role="img"
                  aria-label={`Video placeholder for ${v.title}`}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-warm-white/80 text-charcoal shadow-sm">
                    <Play size={20} className="ml-0.5" />
                  </span>
                  <span className="absolute bottom-2 right-2 rounded-full bg-charcoal/70 px-2 py-0.5 text-[10px] font-accent text-warm-white">
                    {v.duration}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <p className="font-display text-base font-semibold text-charcoal leading-snug">
                    {v.title}
                  </p>
                  <p className="font-accent text-xs text-charcoal/60 mt-0.5">{v.speaker}</p>
                  <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">{v.description}</p>
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

export default Resources;
