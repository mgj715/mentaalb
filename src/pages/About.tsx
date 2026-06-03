import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import WhatIsMentaal from "@/components/WhatIsMentaal";
import FAQSection from "@/components/FAQSection";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-8 space-y-8">
        <div className="space-y-2">
          <p className="font-accent text-xs uppercase tracking-wider text-charcoal/55">About</p>
          <h1 className="font-display text-3xl font-semibold text-charcoal leading-tight">
            About Mentaal
          </h1>
        </div>

        <WhatIsMentaal />

        <FAQSection />

        <section className="pt-2 space-y-4 text-center">
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            Ready to find your space?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/exploring")}
              className="group rounded-3xl border border-sage/40 bg-sage/40 px-4 py-4 text-left transition-colors hover:bg-sage/60"
            >
              <span className="flex items-center justify-between gap-1">
                <span className="block font-display text-base font-semibold text-charcoal">
                  I'm exploring
                </span>
                <ArrowRight
                  size={16}
                  className="text-charcoal/70 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </button>
            <button
              onClick={() => navigate("/quiz")}
              className="group rounded-3xl border border-lavender/40 bg-lavender/40 px-4 py-4 text-left transition-colors hover:bg-lavender/60"
            >
              <span className="flex items-center justify-between gap-1">
                <span className="block font-display text-base font-semibold text-charcoal">
                  I need tailored support
                </span>
                <ArrowRight
                  size={16}
                  className="text-charcoal/70 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
