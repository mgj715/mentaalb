import { BookOpen, Wrench, Sparkles, MessageSquare, Stethoscope, Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "@/data/sections";

const iconMap = {
  book: BookOpen,
  tool: Wrench,
  sparkles: Sparkles,
  message: MessageSquare,
  stethoscope: Stethoscope,
  heart: Heart,
};

// Soft alternating backgrounds keep the page feeling like a gentle wave.
const TONES = [
  "bg-sage/25 border-sage/50",
  "bg-lavender/20 border-lavender/50",
  "bg-peach/25 border-peach/50",
] as const;

const SectionBlock = ({ section }: { section: Section }) => {
  const Icon = iconMap[section.icon] ?? BookOpen;

  if (section.items.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage/40 text-charcoal">
          <Icon size={18} />
        </span>
        <h2 className="font-display text-2xl font-semibold text-charcoal">{section.title}</h2>
      </div>
      <div className="space-y-2">
        {section.items.map((item, i) => (
          <div
            key={item.title}
            className={`rounded-2xl border ${TONES[i % TONES.length]} px-4 py-3.5`}
          >
            <p className="font-display text-base font-semibold text-charcoal leading-snug">{item.title}</p>
            <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
      {section.footer &&
        (section.footer.href ? (
          <Link
            to={section.footer.href}
            className="inline-flex items-center gap-1 text-sm font-accent font-medium text-charcoal hover:underline"
          >
            {section.footer.label}
            <ExternalLink size={12} />
          </Link>
        ) : (
          <button className="flex items-center gap-1 text-sm font-accent font-medium text-charcoal hover:underline">
            {section.footer.label}
            <ExternalLink size={12} />
          </button>
        ))}
    </section>
  );
};

export default SectionBlock;
