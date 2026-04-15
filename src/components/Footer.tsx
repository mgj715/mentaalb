const Footer = () => {
  return (
    <footer className="px-5 py-6 text-center space-y-3">
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">About</a>
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        <a href="#" className="hover:text-foreground transition-colors">Login</a>
      </div>
      <p className="text-xs text-muted-foreground">© 2026 Mentaal</p>
    </footer>
  );
};

export default Footer;
