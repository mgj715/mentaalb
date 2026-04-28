import { Phone } from "lucide-react";

const UrgentHelp = () => {
  return (
    <button className="w-full flex items-center justify-center gap-2 bg-peach text-charcoal px-4 py-3.5 rounded-full text-sm font-accent font-semibold shadow-sm hover:bg-peach/80 transition-colors">
      <Phone size={16} />
      Need urgent help?
    </button>
  );
};

export default UrgentHelp;
