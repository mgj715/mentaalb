import { Menu, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearQuiz, hasQuiz } from "@/lib/quiz-storage";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const hasCompletedQuiz = hasQuiz();

  const handleHomeClick = () => {
    setOpen(false);
    navigate(hasCompletedQuiz ? "/your-space" : "/");
  };

  const handleResetSession = () => {
    clearQuiz();
    setOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="relative flex items-center justify-between px-5 py-4">
      <Link
        to={hasCompletedQuiz ? "/your-space" : "/"}
        className="font-display text-2xl font-semibold tracking-tight text-charcoal hover:text-charcoal/70 transition-colors"
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
            <button
              onClick={handleHomeClick}
              className="rounded-2xl px-4 py-3 font-display text-lg text-charcoal hover:bg-sage/30 transition-colors text-left"
            >
              Home
            </button>

            <Link
              to="/exploring"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-display text-lg text-charcoal hover:bg-sage/30 transition-colors"
            >
              Explore freely
            </Link>

            <Link
              to="/quiz"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-display text-lg text-charcoal hover:bg-sage/30 transition-colors"
            >
              Take the quiz
            </Link>

            <div className="my-3 border-t border-sage/20" />

            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-display text-lg text-charcoal hover:bg-sage/30 transition-colors"
            >
              About
            </Link>

            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-display text-lg text-charcoal hover:bg-sage/30 transition-colors"
            >
              Sign in
            </Link>

            <div className="mt-6 pt-4 border-t border-sage/20">
              <button
                onClick={handleResetSession}
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
