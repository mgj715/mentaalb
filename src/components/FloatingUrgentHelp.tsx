import { Phone } from "lucide-react";

const FloatingUrgentHelp = () => {
  return (
    <a
      href="tel:988"
      aria-label="Need urgent help?"
      className="fixed z-50 bottom-5 right-5 md:bottom-6 md:right-6 inline-flex items-center gap-2 bg-peach text-charcoal pl-3.5 pr-4 py-2.5 rounded-full text-xs font-accent font-semibold shadow-lg hover:bg-peach/90 transition-colors"
    >
      <Phone size={14} />
      <span>Need urgent help?</span>
    </a>
  );
};

export default FloatingUrgentHelp;
