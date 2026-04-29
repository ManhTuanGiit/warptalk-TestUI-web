export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background transition-colors duration-700">
      {/* Global background inherits from theme */}
    </div>
  );
}
