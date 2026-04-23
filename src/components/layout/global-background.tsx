export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white dark:bg-slate-950 transition-colors duration-700 ease-in-out">
      {/* Smooth background layer that covers overscroll */}
    </div>
  );
}
