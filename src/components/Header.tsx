import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative flex items-center justify-between px-5 py-4">
      <Link
        to="/"
        className="font-display text-2xl font-semibold tracking-tight text-charcoal hover:text-charcoal/70 transition-colors"
        aria-label="Go to homepage"
      >
        Mentaal
      </Link>
      <button
        className="rounded-full p-2 text-charcoal hover:bg-sage/30 transition-colors"
        aria-label="Menu"
      >
        <Menu size={22} />
      </button>
    </header>
  );
};

export default Header;
