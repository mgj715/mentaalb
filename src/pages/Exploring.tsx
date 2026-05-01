import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionBlock from "@/components/SectionBlock";
import SoftBackdrop from "@/components/SoftBackdrop";
import { PERSONAL_SECTIONS, FIXED_ORDER } from "@/data/sections";

const Exploring = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col max-w-md mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold text-charcoal">Explore freely</h1>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Wander through the spaces below. Take what helps, leave what doesn't.
          </p>
        </div>
        {FIXED_ORDER.map((id) => (
          <SectionBlock key={id} section={PERSONAL_SECTIONS[id]} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Exploring;
