import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoftBackdrop from "@/components/SoftBackdrop";
import { Button } from "@/components/ui/button";
import SignInPrompt from "@/components/SignInPrompt";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const SmallCircle = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleJoin = () => {
    if (user) {
      toast({
        title: "You've joined Small Circle",
        description: "We'll let the group know to welcome you.",
      });
      return;
    }
    setShowPrompt(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-background overflow-hidden">
      <SoftBackdrop />
      <Header />
      <main className="flex-1 px-5 py-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm font-accent text-charcoal/70 hover:text-charcoal transition-colors"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="space-y-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-peach/40 text-charcoal">
            <Users size={18} />
          </span>
          <h1 className="font-display text-3xl font-semibold text-charcoal leading-tight">
            Small Circle
          </h1>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            A small, gentle support group for people caring for someone they love. Members
            check in weekly, share what's heavy, and offer each other quiet support — at
            their own pace.
          </p>
        </div>

        <article className="rounded-2xl border border-peach/40 bg-peach/25 shadow-sm px-4 py-3.5 space-y-2">
          <p className="font-display text-base font-semibold text-charcoal">What to expect</p>
          <ul className="text-sm text-charcoal/75 space-y-1 list-disc pl-4">
            <li>Up to 8 members per circle</li>
            <li>One short check-in per week, no pressure to share</li>
            <li>Private, moderated, and confidential</li>
          </ul>
        </article>

        {showPrompt ? (
          <SignInPrompt action="join this circle" />
        ) : (
          <Button onClick={handleJoin} className="w-full rounded-full">
            Join this circle
          </Button>
        )}

        <p className="text-xs text-charcoal/55 text-center">
          Browsing is open to everyone. You only need an account to join.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default SmallCircle;
