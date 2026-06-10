import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Props = {
  /** Action describer, e.g. "post here" or "join this circle" */
  action: string;
  /** Optional className wrapping */
  className?: string;
  /** Where to send the user after auth (defaults to current path) */
  redirectTo?: string;
};

const SignInPrompt = ({ action, className, redirectTo }: Props) => {
  const location = useLocation();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const target = redirectTo ?? location.pathname + location.search;
  const authHref = `/auth?redirect=${encodeURIComponent(target)}`;

  return (
    <div
      className={`rounded-2xl border border-lavender/50 bg-lavender/20 shadow-sm px-4 py-3.5 space-y-3 ${
        className ?? ""
      }`}
    >
      <p className="text-sm text-charcoal leading-relaxed">
        To {action}, you'll need a free account. It takes 30 seconds and you won't lose
        anything you've already explored.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Link to={authHref} className="flex-1">
          <Button size="sm" className="w-full rounded-full">
            Create account
          </Button>
        </Link>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 rounded-full"
          onClick={() => setDismissed(true)}
        >
          Maybe later
        </Button>
      </div>
    </div>
  );
};

export default SignInPrompt;
