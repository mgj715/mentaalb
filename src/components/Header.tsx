import { Menu, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="flex items-center justify-between px-5 py-4">
      {isHome ? (
        <h1 className="font-display text-xl text-foreground">Mentaal</h1>
      ) : (
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-foreground hover:text-muted-foreground transition-colors" aria-label="Go back">
          <ArrowLeft size={22} />
        </button>
      )}
      <button className="p-2 text-foreground hover:text-muted-foreground transition-colors" aria-label="Menu">
        <Menu size={22} />
      </button>
    </header>
  );
};

export default Header;
