import { BookOpen, Wrench, Sparkles, MessageSquare, Stethoscope, Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Section, SectionId } from "@/data/sections";

const iconMap = {
  book: BookOpen,
  tool: Wrench,
  sparkles: Sparkles,
  message: MessageSquare,
  stethoscope: Stethoscope,
  heart: Heart,
};

// Card color is driven by content type/section, not by index position.
const SECTION_TONE: Record<SectionId, string> = {
  resources: "bg-lavender/25 border-lavender/40 shadow-sm",
  tools: "bg-sage/25 border-sage/40 shadow-sm",
  activities: "bg-sage/25 border-sage/40 shadow-sm",
  forums: "bg-peach/25 border-peach/40 shadow-sm",
  professional: "bg-white border-stone/30 shadow-sm",
  caregiver: "bg-peach/25 border-peach/40 shadow-sm",
};

const SectionBlock = ({ section }: { section: Section }) => {
  const Icon = iconMap[section.icon] ?? BookOpen;

  if (section.items.length === 0) return null;

  const tone = SECTION_TONE[section.id];

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage/40 text-charcoal">
          <Icon size={18} />
        </span>
        <h2 className="font-display text-2xl font-semibold text-charcoal">{section.title}</h2>
      </div>
      <div className="space-y-2">
        {section.items.map((item) => {
          const isCrisis = /crisis/i.test(item.title);
          if (isCrisis) {
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-[#1e2329] px-4 py-3.5"
              >
                <p className="font-display text-base font-semibold text-warm-white leading-snug">{item.title}</p>
                <p className="text-xs text-warm-white/75 mt-1 leading-relaxed">{item.description}</p>
              </div>
            );
          }
          return (
            <div
              key={item.title}
              className={`rounded-2xl border ${tone} px-4 py-3.5`}
            >
              <p className="font-display text-base font-semibold text-charcoal leading-snug">{item.title}</p>
              <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
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
