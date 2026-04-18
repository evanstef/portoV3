"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ModeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [rightOffset, setRightOffset] = useState(0);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function updateOffset() {
      const containerWidth = 768;
      const windowWidth = window.innerWidth;
      const offset = Math.max(0, (windowWidth - containerWidth) / 2);
      setRightOffset(offset);
    }

    function handleScroll() {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          setShow(false);
        } else {
          setShow(true);
        }
        setLastScrollY(window.scrollY);
      }
    }

    updateOffset();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateOffset);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateOffset);
    };
  }, [lastScrollY]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      style={{ right: `${rightOffset + 20}px` }}
      className={`font-pixel fixed bottom-[26px] z-50 flex h-12 w-12 items-center justify-center pixel-border pixel-shadow-sm pixel-step bg-[var(--bg-elevated)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md ${
        show ? "translate-y-0" : "translate-y-24"
      }`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        style={{ shapeRendering: "crispEdges" }}
      >
        {isDark ? (
          <g fill="var(--accent-yellow)">
            <rect x="7" y="2" width="2" height="2" />
            <rect x="5" y="5" width="6" height="6" />
            <rect x="6" y="4" width="4" height="1" />
            <rect x="6" y="11" width="4" height="1" />
            <rect x="4" y="6" width="1" height="4" />
            <rect x="11" y="6" width="1" height="4" />
            <rect x="7" y="12" width="2" height="2" />
            <rect x="2" y="7" width="2" height="2" />
            <rect x="12" y="7" width="2" height="2" />
            <rect x="3" y="3" width="2" height="2" />
            <rect x="11" y="3" width="2" height="2" />
            <rect x="3" y="11" width="2" height="2" />
            <rect x="11" y="11" width="2" height="2" />
          </g>
        ) : (
          <g fill="var(--accent-cyan)">
            <rect x="5" y="3" width="5" height="1" />
            <rect x="4" y="4" width="2" height="1" />
            <rect x="4" y="5" width="2" height="1" />
            <rect x="3" y="6" width="2" height="4" />
            <rect x="4" y="10" width="2" height="1" />
            <rect x="4" y="11" width="2" height="1" />
            <rect x="5" y="12" width="5" height="1" />
            <rect x="10" y="11" width="1" height="1" />
            <rect x="11" y="10" width="1" height="1" />
          </g>
        )}
      </svg>
    </button>
  );
}
