import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/exploring", label: "Explore" },
  { to: "/tailored", label: "Tailored for you" },
  { to: "/resources", label: "Resources" },
  { to: "/forums", label: "Forums" },
  { to: "/quiz", label: "Take the quiz" },
  { to: "/auth", label: "Sign in" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between px-5 py-4">
      <Link
        to="/"
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-display text-lg text-charcoal hover:bg-sage/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
