import WaveDivider from "@/components/WaveDivider";

const Footer = () => {
  return (
    <footer className="mt-8">
      <WaveDivider className="text-sage/40" />
      <div className="bg-sage/30 px-5 pt-6 pb-8 text-center space-y-3">
        <div className="flex items-center justify-center gap-6 text-sm font-accent text-charcoal/80">
          <a href="/about" className="hover:text-charcoal transition-colors">About</a>
          <a href="#" className="hover:text-charcoal transition-colors">Privacy</a>
          <a href="#" className="hover:text-charcoal transition-colors">Login</a>
        </div>
        <p className="font-accent text-xs text-charcoal/60">© 2026 Mentaal — a calm space</p>
      </div>
    </footer>
  );
};

export default Footer;
