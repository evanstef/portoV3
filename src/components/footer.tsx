export default function Footer() {
  return (
    <footer className="mt-auto pt-6 pb-8">
      <div aria-hidden className="pixel-divider mb-4" />
      <div className="container mx-auto flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] sm:text-xs text-[var(--fg-muted)]">
          &copy; {new Date().getFullYear()} EVAN&apos;S FARM
        </p>
        <p className="font-pixel text-[9px] sm:text-[10px] text-[var(--accent-wheat)] uppercase tracking-wider flex items-center gap-2">
          <span>❀</span>
          <span>THANKS FOR VISITING</span>
          <span>❀</span>
        </p>
      </div>
    </footer>
  );
}
