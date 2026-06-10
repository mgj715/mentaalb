import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SoftBackdrop from "@/components/SoftBackdrop";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden px-5">
      <SoftBackdrop />
      <div className="text-center space-y-3 rounded-3xl border border-sage/50 bg-card/80 backdrop-blur-sm px-8 py-10 max-w-sm w-full">
        <p className="font-display text-6xl font-semibold text-charcoal">404</p>
        <p className="text-base text-charcoal/70">This page wandered off.</p>
        <a
          href="/"
          className="inline-block rounded-full bg-sage/50 px-5 py-2 font-accent text-sm font-medium text-charcoal hover:bg-sage/70 transition-colors"
        >
          Return home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
