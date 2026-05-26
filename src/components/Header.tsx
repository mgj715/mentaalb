import { Menu, RefreshCw } from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { clearQuiz } from "@/lib/quiz-storage";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


const PRIMARY_LINKS = [
  { to: "/", label: "Home" },
  { to: "/exploring", label: "Explore freely" },
  { to: "/quiz", label: "Take the quiz" },
];

const SECONDARY_LINKS = [
  { to: "/about", label: "About" },
  { to: "/auth", label: "Sign in" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between px-5 py-4">
      <Link
        to="/"
        className="inline-flex items-center font-display text-3xl font-bold text-charcoal hover:opacity-70 transition-opacity"
        aria-label="Go to homepage"
      >
        Mentaal
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="rounded-full p-2 text-charcoal hover:bg-sage/30 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-warm-white border-l-sage/30">
          <SheetHeader>
            <SheetTitle className="font-display text-2xl text-charcoal text-left">
              Mentaal
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-8 flex flex-col gap-1">
            {PRIMARY_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-display text-lg text-charcoal hover:bg-sage/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-3 border-t border-sage/20" />
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-display text-lg text-charcoal hover:bg-sage/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 pt-4 border-t border-sage/20">
              <button
                onClick={() => {
                  clearQuiz();
                  setOpen(false);
                  window.location.href = "/";
                }}
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs text-charcoal/40 hover:text-charcoal/70 transition-colors"
              >
                <RefreshCw size={11} />
                Reset session
              </button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
