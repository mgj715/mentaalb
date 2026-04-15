import { Phone } from "lucide-react";

const UrgentHelp = () => {
  return (
    <button className="w-full flex items-center justify-center gap-2 bg-crisis text-crisis-foreground px-4 py-3 rounded-full text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity">
      <Phone size={16} />
      Need urgent help?
    </button>
  );
};

export default UrgentHelp;
