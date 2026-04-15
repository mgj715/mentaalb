import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UrgentHelp from "@/components/UrgentHelp";
import WhatIsMentaal from "@/components/WhatIsMentaal";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-background">
      <Header />
      <main className="flex-1 px-5 py-6 space-y-5">
        <HeroSection />
        <UrgentHelp />
        <WhatIsMentaal />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
