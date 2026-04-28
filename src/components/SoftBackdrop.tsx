/**
 * Decorative blurred organic blobs in the brand palette.
 * Sits behind page content (pointer-events: none) to add soft depth.
 */
const SoftBackdrop = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
  >
    <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-sage/40 blur-3xl" />
    <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-lavender/35 blur-3xl" />
    <div className="absolute bottom-0 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-peach/30 blur-3xl" />
  </div>
);

export default SoftBackdrop;
