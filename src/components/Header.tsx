import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <h1 className="font-display text-xl text-foreground">Mentaal</h1>
      <button className="p-2 text-foreground hover:text-muted-foreground transition-colors" aria-label="Menu">
        <Menu size={22} />
      </button>
    </header>
  );
};

export default Header;
