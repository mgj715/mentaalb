import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type PanelId = "exploring" | "personal" | "caregiver";

const HeroSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<PanelId | null>(null);

  const toggle = (id: PanelId) => setOpen((cur) => (cur === id ? null : id));

  const panel = (id: PanelId, title: string, body: React.ReactNode) => (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => toggle(id)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-accent/40 transition-colors"
        aria-expanded={open === id}
      >
        <span className="font-display text-base font-semibold text-card-foreground">{title}</span>
        <ChevronDown
          size={18}
          className={`text-muted-foreground transition-transform ${open === id ? "rotate-180" : ""}`}
        />
      </button>
      {open === id && <div className="px-5 pb-5 pt-1 space-y-3">{body}</div>}
    </div>
  );

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Mentaal is a calm place to explore what you or a loved one may be going through. We guide you toward support in a way that feels safe, private, and at your pace.
      </p>

      <div className="space-y-3">
        {panel(
          "exploring",
          "I'm Exploring",
          <>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Not sure where to start? Browse topics, learn about mental health, and find out what's available — no commitment needed.
            </p>
            <Button className="w-full rounded-xl" onClick={() => navigate("/exploring")}>
              Browse Resources
            </Button>
          </>,
        )}

        {panel(
          "personal",
          "Personal Support",
          <>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You're looking for support for yourself. Take a short quiz to find the right resources, therapists, and communities tailored to your needs.
            </p>
            <Button className="w-full rounded-xl" onClick={() => navigate("/quiz?mode=personal")}>
              Start Quiz
            </Button>
            <Button
              variant="secondary"
              className="w-full rounded-xl"
              onClick={() => navigate("/tailored?mode=personal")}
            >
              Skip Quiz
            </Button>
          </>,
        )}

        {panel(
          "caregiver",
          "Caregiver Support",
          <>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You're supporting someone you care about. Discover guidance, peer groups, and practical tools for caregivers and loved ones.
            </p>
            <Button className="w-full rounded-xl" onClick={() => navigate("/quiz?mode=caregiver")}>
              Start Quiz
            </Button>
            <Button
              variant="secondary"
              className="w-full rounded-xl"
              onClick={() => navigate("/tailored?mode=caregiver")}
            >
              Skip Quiz
            </Button>
          </>,
        )}
      </div>
    </div>
  );
};

export default HeroSection;
