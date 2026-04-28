import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionBlock from "@/components/SectionBlock";
import SoftBackdrop from "@/components/SoftBackdrop";
import { PERSONAL_SECTIONS, FIXED_ORDER } from "@/data/sections";

const Exploring = () => {
  return (
    <div className="relative min-h-screen flex flex-col max-w-md mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-8">
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
