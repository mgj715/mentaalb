import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Mentaal is a calm place to explore what you or a loved one may be going through. We guide you toward support in a way that feels safe, private, and at your pace.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => navigate("/exploring")}
          className="w-full rounded-xl border border-border bg-card px-5 py-5 text-left hover:bg-accent/50 transition-colors"
        >
          <span className="font-display text-lg font-semibold text-card-foreground">I'm exploring</span>
        </button>

        <div className="rounded-xl border border-border bg-card overflow-hidden transition-all">
          <button
            onClick={() => setShowSupport(!showSupport)}
            className="w-full flex items-center justify-between px-5 py-5 text-left hover:bg-accent/50 transition-colors"
          >
            <span className="font-display text-lg font-semibold text-card-foreground">I need tailored support</span>
            <ChevronDown
              size={20}
              className={`text-muted-foreground transition-transform duration-200 ${showSupport ? "rotate-180" : ""}`}
            />
          </button>

          {showSupport && (
            <div className="px-5 pb-4 space-y-2">
              <button
                onClick={() => navigate("/personal-support")}
                className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-left hover:bg-accent/50 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">Personal Support</span>
              </button>
              <button
                onClick={() => navigate("/caregiver-support")}
                className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-left hover:bg-accent/50 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">Caregiver Support</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
