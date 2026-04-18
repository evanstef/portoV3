import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10">
      {/* Wooden signpost scene */}
      <div className="relative bg-[var(--bg-elevated)] pixel-border pixel-shadow-md p-6 sm:p-8 max-w-md w-full text-center">
        <span
          aria-hidden
          className="absolute top-2 left-2 h-2 w-2 bg-[var(--wood-dark)]"
        />
        <span
          aria-hidden
          className="absolute top-2 right-2 h-2 w-2 bg-[var(--wood-dark)]"
        />

        {/* Passed-out farmer sprite */}
        <svg
          width="96"
          height="64"
          viewBox="0 0 24 16"
          className="mx-auto"
          style={{ shapeRendering: "crispEdges" }}
          aria-hidden
        >
          {/* Body lying down */}
          <g fill="var(--wood-light)">
            <rect x="4" y="10" width="14" height="3" />
          </g>
          {/* Shirt */}
          <g fill="var(--accent-water)">
            <rect x="8" y="9" width="7" height="1" />
            <rect x="8" y="10" width="7" height="2" />
          </g>
          {/* Head */}
          <g fill="var(--wood-light)">
            <rect x="4" y="8" width="4" height="4" />
          </g>
          {/* Hair */}
          <g fill="var(--wood-dark)">
            <rect x="4" y="7" width="4" height="1" />
            <rect x="4" y="8" width="1" height="1" />
          </g>
          {/* Z's */}
          <g fill="var(--accent-water)">
            <rect x="9" y="3" width="2" height="1" />
            <rect x="10" y="4" width="1" height="1" />
            <rect x="9" y="5" width="2" height="1" />
          </g>
          <g fill="var(--accent-water)" opacity="0.6">
            <rect x="13" y="1" width="3" height="1" />
            <rect x="14" y="2" width="2" height="1" />
            <rect x="15" y="3" width="1" height="1" />
            <rect x="13" y="4" width="3" height="1" />
          </g>
          {/* Ground */}
          <g fill="var(--accent-leaf)" opacity="0.7">
            <rect x="0" y="13" width="24" height="1" />
            <rect x="0" y="14" width="24" height="2" />
          </g>
        </svg>

        <p className="font-pixel text-[10px] sm:text-xs text-[var(--accent-lantern)] mt-6 mb-2">
          &gt; 9:00 PM
        </p>
        <h1 className="font-pixel text-sm sm:text-base lg:text-xl text-[var(--accent-blossom)] leading-relaxed">
          YOU COLLAPSED
          <br />
          FROM EXHAUSTION...
        </h1>
        <p className="font-mono text-xs sm:text-sm text-[var(--fg-muted)] mt-4">
          this page does not exist.
          <br />
          <span className="text-[var(--destructive)]">
            you lost 10g and some energy.
          </span>
        </p>

        <div aria-hidden className="pixel-divider my-5" />

        <p className="font-pixel text-[9px] sm:text-[10px] text-[var(--fg-muted)] mb-4">
          TOMORROW IS A NEW DAY.
        </p>

        <Link
          href="/"
          className="font-pixel inline-flex items-center gap-2 bg-[var(--accent-leaf)] text-[var(--bg-elevated)] pixel-border pixel-shadow-sm pixel-step px-4 py-2 text-[10px] sm:text-xs hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          <span>[ RETURN TO FARM ]</span>
        </Link>
      </div>
    </div>
  );
}
