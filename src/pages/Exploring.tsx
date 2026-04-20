import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionBlock from "@/components/SectionBlock";
import { PERSONAL_SECTIONS, FIXED_ORDER } from "@/data/sections";

const Exploring = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-background">
      <Header />
      <main className="flex-1 px-5 py-6 space-y-8">
        {FIXED_ORDER.map((id) => (
          <SectionBlock key={id} section={PERSONAL_SECTIONS[id]} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Exploring;
