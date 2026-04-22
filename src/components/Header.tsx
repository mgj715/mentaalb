import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <Link
        to="/"
        className="font-display text-xl text-foreground hover:text-muted-foreground transition-colors"
        aria-label="Go to homepage"
      >
        Mentaal
      </Link>
      <button className="p-2 text-foreground hover:text-muted-foreground transition-colors" aria-label="Menu">
        <Menu size={22} />
      </button>
    </header>
  );
};

export default Header;
