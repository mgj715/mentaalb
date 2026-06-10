import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-sage/50 px-5 py-6 text-center">
      <nav className="flex flex-wrap justify-center gap-4 text-sm text-charcoal/60">
        <Link to="/about" className="hover:text-charcoal transition-colors">
          About
        </Link>
        <Link to="/resources" className="hover:text-charcoal transition-colors">
          Resources
        </Link>
        <Link to="/forums" className="hover:text-charcoal transition-colors">
          Forums
        </Link>
      </nav>
      <p className="mt-3 text-xs text-charcoal/40">
        © {new Date().getFullYear()} Mentaal
      </p>
    </footer>
  );
};

export default Footer;
