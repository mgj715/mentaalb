import { cn } from "@/lib/utils";

type WaveDividerProps = {
  /** Tailwind text color class for the wave fill (uses currentColor). */
  className?: string;
  /** Flip vertically so the wave curves upward instead of down. */
  flip?: boolean;
};

/**
 * Soft, organic wave divider — uses currentColor so callers can tint it
 * by passing any text-* color class (e.g. text-sage, text-lavender).
 */
const WaveDivider = ({ className, flip = false }: WaveDividerProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    className={cn("block w-full h-10", flip && "rotate-180", className)}
  >
    <path
      d="M0,64 C240,120 480,8 720,48 C960,88 1200,120 1440,72 L1440,120 L0,120 Z"
      fill="currentColor"
    />
  </svg>
);

export default WaveDivider;
