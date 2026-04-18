"use client";

import { useEffect, useRef, useState } from "react";

type TrailDot = { id: number; x: number; y: number };

const TRAIL_THROTTLE_MS = 28;
const TRAIL_LIFETIME_MS = 440;
const BURST_COUNT = 6;
const BURST_DISTANCE = 22;
const BURST_LIFETIME_MS = 520;
const TRAIL_MAX = 24;

export default function PixelCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(false);
  const [trails, setTrails] = useState<TrailDot[]>([]);
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduceMotion || isTouch) return;

    document.body.setAttribute("data-pixel-cursor", "on");

    let lastTrailAt = 0;
    let idCounter = 0;

    const spawnTrail = (x: number, y: number) => {
      const id = idCounter;
      idCounter += 1;
      setTrails((prev) => [...prev, { id, x, y }].slice(-TRAIL_MAX));
      window.setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== id));
      }, TRAIL_LIFETIME_MS);
    };

    const handleMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
      const now = performance.now();
      if (now - lastTrailAt >= TRAIL_THROTTLE_MS) {
        lastTrailAt = now;
        spawnTrail(e.clientX, e.clientY);
      }
    };

    const handleOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor-interactive]'
      );
      setIsHover(Boolean(interactive));
    };

    const handleClick = (e: MouseEvent) => {
      const burstIds: number[] = [];
      const dots: TrailDot[] = [];
      for (let i = 0; i < BURST_COUNT; i += 1) {
        const angle = (Math.PI * 2 * i) / BURST_COUNT;
        const id = idCounter;
        idCounter += 1;
        burstIds.push(id);
        dots.push({
          id,
          x: e.clientX + Math.cos(angle) * BURST_DISTANCE,
          y: e.clientY + Math.sin(angle) * BURST_DISTANCE,
        });
      }
      setTrails((prev) => [...prev, ...dots]);
      window.setTimeout(() => {
        setTrails((prev) => prev.filter((t) => !burstIds.includes(t.id)));
      }, BURST_LIFETIME_MS);
    };

    const handleLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleLeave);
      document.body.removeAttribute("data-pixel-cursor");
    };
  }, []);

  const cursorColor = isHover ? "var(--accent-cyan)" : "var(--accent-pink)";
  const trailColor = isHover ? "var(--accent-cyan)" : "var(--accent-pink)";

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 160ms steps(3)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          style={{
            shapeRendering: "crispEdges",
            filter: "drop-shadow(2px 2px 0 var(--shadow-block))",
            transform: isHover ? "scale(1.1)" : "scale(1)",
            transformOrigin: "top left",
            transition: "transform 120ms steps(3)",
          }}
        >
          <g fill={cursorColor}>
            <rect x="2" y="2" width="1" height="1" />
            <rect x="2" y="3" width="2" height="1" />
            <rect x="2" y="4" width="3" height="1" />
            <rect x="2" y="5" width="4" height="1" />
            <rect x="2" y="6" width="5" height="1" />
            <rect x="2" y="7" width="6" height="1" />
            <rect x="2" y="8" width="7" height="1" />
            <rect x="2" y="9" width="4" height="1" />
            <rect x="2" y="10" width="2" height="1" />
            <rect x="5" y="10" width="2" height="1" />
            <rect x="3" y="11" width="2" height="1" />
            <rect x="6" y="11" width="2" height="1" />
            <rect x="6" y="12" width="2" height="1" />
          </g>
        </svg>
      </div>

      {trails.map((t) => (
        <div
          key={t.id}
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[9998]"
          style={{
            transform: `translate3d(${t.x - 2}px, ${t.y - 2}px, 0)`,
            width: 4,
            height: 4,
            background: trailColor,
            animation: "pixel-trail 440ms steps(5) forwards",
          }}
        />
      ))}
    </>
  );
}
