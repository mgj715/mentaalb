import { BookOpen, Wrench, Sparkles, MessageSquare, Stethoscope, Heart, ExternalLink } from "lucide-react";
import { Section } from "@/data/sections";

const iconMap = {
  book: BookOpen,
  tool: Wrench,
  sparkles: Sparkles,
  message: MessageSquare,
  stethoscope: Stethoscope,
  heart: Heart,
};

const SectionBlock = ({ section }: { section: Section }) => {
  const Icon = iconMap[section.icon] ?? BookOpen;

  if (section.items.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon size={18} className="text-primary" />
        <h2 className="font-display text-lg font-semibold text-foreground">{section.title}</h2>
      </div>
      <div className="space-y-2">
        {section.items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-card px-4 py-3"
          >
            <p className="font-display text-sm font-semibold text-card-foreground">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
      {section.footer && (
        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          {section.footer.label}
          <ExternalLink size={12} />
        </button>
      )}
    </section>
  );
};

export default SectionBlock;
