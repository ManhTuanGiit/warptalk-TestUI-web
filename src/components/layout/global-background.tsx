export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white transition-colors duration-700 dark:bg-black">
      {/* Simple white background for light mode, black for dark mode */}
    </div>
  );
}
