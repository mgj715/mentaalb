import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatIsMentaal from "@/components/WhatIsMentaal";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { hasQuiz } from "@/lib/quiz-storage";

const Index = () => {
  if (hasQuiz()) {
    return <Navigate to="/your-space" replace />;
  }

  return (
    <div className="relative min-h-screen flex flex-col max-w-md mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-6">
        <HeroSection />
        <WhatIsMentaal />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
