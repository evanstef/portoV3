"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 35;
const MAX_STEP = 3; // px per frame at 60fps ≈ 66 px/sec (realistic walk pace)
const DELAY_MS = 500;
const HOP_ENTER = 6;
const HOP_EXIT = 1.5;
const SLEEP_AFTER_MS = 2000;
const OFFSET_X = 28;
const OFFSET_Y = 20;
const HISTORY_MAX_MS = 3000;

type State = "idle" | "hop" | "sleep";
type Facing = "left" | "right";
type Sample = { x: number; y: number; t: number };

const SKIN = "#F4C8A8";

export default function PixelPet() {
  const petRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<Sample[]>([]);
  const lastCursorRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const lastMoveAtRef = useRef(0);
  const facingRef = useRef<Facing>("right");
  const stateRef = useRef<State>("sleep");
  const [renderState, setRenderState] = useState<State>("sleep");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduceMotion || isTouch) return;

    const initX = window.innerWidth / 2;
    const initY = window.innerHeight - 120;
    posRef.current = { x: initX, y: initY };
    lastCursorRef.current = { x: initX, y: initY };
    historyRef.current = [{ x: initX, y: initY, t: performance.now() }];

    const handleMove = (e: MouseEvent) => {
      const now = performance.now();
      lastCursorRef.current = { x: e.clientX, y: e.clientY };
      lastMoveAtRef.current = now;
      historyRef.current.push({ x: e.clientX, y: e.clientY, t: now });
      // Prune old samples
      while (
        historyRef.current.length > 0 &&
        now - historyRef.current[0].t > HISTORY_MAX_MS
      ) {
        historyRef.current.shift();
      }
    };
    document.addEventListener("mousemove", handleMove);

    const getDelayedTarget = (now: number): { x: number; y: number } => {
      const targetTime = now - DELAY_MS;
      const history = historyRef.current;
      if (history.length === 0) return lastCursorRef.current;

      // Find the latest sample that's older than (now - DELAY_MS)
      let selected = history[0];
      for (const sample of history) {
        if (sample.t <= targetTime) {
          selected = sample;
        } else {
          break;
        }
      }
      return { x: selected.x, y: selected.y };
    };

    let rafId = 0;
    const tick = () => {
      const now = performance.now();
      const target = getDelayedTarget(now);

      const prevX = posRef.current.x;
      const dx = target.x - posRef.current.x;
      const dy = target.y - posRef.current.y;
      const distance = Math.hypot(dx, dy);

      // Constant walking speed (capped at distance to prevent overshoot)
      if (distance > 0.3) {
        const step = Math.min(MAX_STEP, distance);
        posRef.current.x += (dx / distance) * step;
        posRef.current.y += (dy / distance) * step;
      }
      const idleFor = now - lastMoveAtRef.current;
      const current = stateRef.current;

      // Hysteresis state transition
      let nextState: State = current;
      if (current === "hop") {
        if (distance < HOP_EXIT) {
          nextState = idleFor > SLEEP_AFTER_MS ? "sleep" : "idle";
        }
      } else if (current === "sleep") {
        if (distance > HOP_ENTER) nextState = "hop";
        else if (idleFor < SLEEP_AFTER_MS) nextState = "idle";
      } else {
        if (distance > HOP_ENTER) nextState = "hop";
        else if (idleFor > SLEEP_AFTER_MS) nextState = "sleep";
      }

      // Facing — based on actual pet movement direction, not cursor
      const velocityX = posRef.current.x - prevX;
      if (velocityX > 0.4 && facingRef.current !== "right" && flipRef.current) {
        facingRef.current = "right";
        flipRef.current.dataset.facing = "right";
      } else if (
        velocityX < -0.4 &&
        facingRef.current !== "left" &&
        flipRef.current
      ) {
        facingRef.current = "left";
        flipRef.current.dataset.facing = "left";
      }

      const px = Math.round(posRef.current.x - SIZE / 2 + OFFSET_X);
      const py = Math.round(posRef.current.y - SIZE / 2 + OFFSET_Y);

      if (petRef.current) {
        petRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }

      if (nextState !== current) {
        stateRef.current = nextState;
        if (spriteRef.current) {
          spriteRef.current.dataset.state = nextState;
        }
        setRenderState(nextState);
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isSleeping = renderState === "sleep";

  return (
    <div
      ref={petRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9997] will-change-transform"
      style={{
        width: SIZE,
        height: SIZE + 12,
        transform: "translate3d(-9999px, -9999px, 0)",
      }}
    >
      {/* Floating Z's — only rendered while sleeping */}
      {isSleeping && (
        <>
          <span
            aria-hidden
            className="absolute font-pixel text-[10px] leading-none"
            style={{
              top: -4,
              right: 0,
              color: "var(--accent-water)",
              animation: "pet-z-float 1600ms steps(4) infinite",
            }}
          >
            Z
          </span>
          <span
            aria-hidden
            className="absolute font-pixel text-[8px] leading-none"
            style={{
              top: 2,
              right: 8,
              color: "var(--accent-water)",
              animation: "pet-z-float 1600ms steps(4) infinite 400ms",
            }}
          >
            z
          </span>
        </>
      )}

      {/* Facing flip layer */}
      <div
        ref={flipRef}
        data-facing="right"
        className="pet-flip absolute"
        style={{
          top: 0,
          left: 0,
          width: SIZE,
          height: SIZE,
        }}
      >
        {/* Animation layer */}
        <div
          ref={spriteRef}
          data-state="sleep"
          className="pet-sprite"
          style={{
            width: "100%",
            height: "100%",
            transformOrigin: "bottom center",
          }}
        >
          <svg
            width={SIZE}
            height={SIZE}
            viewBox="0 0 16 16"
            style={{
              shapeRendering: "crispEdges",
              filter: "drop-shadow(1px 2px 0 var(--shadow-block))",
            }}
          >
            {/* Straw hat top */}
            <g fill="var(--accent-wheat)">
              <rect x="5" y="1" width="6" height="1" />
              <rect x="4" y="2" width="8" height="1" />
              <rect x="4" y="3" width="8" height="1" />
            </g>

            {/* Hat brim */}
            <g fill="var(--wood-mid)">
              <rect x="2" y="4" width="12" height="1" />
            </g>

            {/* Hair peek */}
            <g fill="var(--wood-dark)">
              <rect x="5" y="5" width="6" height="1" />
            </g>

            {/* Face */}
            <g fill={SKIN}>
              <rect x="5" y="5" width="6" height="1" />
              <rect x="5" y="6" width="6" height="1" />
              <rect x="5" y="7" width="6" height="1" />
              <rect x="6" y="8" width="4" height="1" />
            </g>

            {/* Hair sides */}
            <g fill="var(--wood-dark)">
              <rect x="5" y="5" width="1" height="3" />
              <rect x="10" y="5" width="1" height="3" />
            </g>

            {/* Eyes */}
            {isSleeping ? (
              <g fill="var(--wood-dark)">
                <rect x="6" y="7" width="2" height="1" />
                <rect x="9" y="7" width="2" height="1" />
              </g>
            ) : (
              <g fill="var(--wood-dark)">
                <rect x="7" y="6" width="1" height="2" />
                <rect x="9" y="6" width="1" height="2" />
              </g>
            )}

            {/* Shirt (blue) */}
            <g fill="var(--accent-water)">
              <rect x="3" y="9" width="10" height="1" />
              <rect x="2" y="10" width="12" height="1" />
              <rect x="2" y="11" width="12" height="1" />
              <rect x="3" y="12" width="10" height="1" />
            </g>

            {/* Shirt collar shadow */}
            <g fill="var(--wood-dark)" opacity="0.35">
              <rect x="7" y="9" width="2" height="1" />
            </g>

            {/* Arms (skin) */}
            <g fill={SKIN}>
              <rect x="2" y="10" width="1" height="2" />
              <rect x="13" y="10" width="1" height="2" />
            </g>

            {/* Legs — standing (idle/sleep) */}
            <g className="pet-leg-static" fill="var(--wood-dark)">
              <rect x="4" y="13" width="3" height="2" />
              <rect x="9" y="13" width="3" height="2" />
            </g>
            <g className="pet-leg-static" fill="var(--shadow-block)">
              <rect x="4" y="15" width="3" height="1" />
              <rect x="9" y="15" width="3" height="1" />
            </g>

            {/* Legs — walk frame A: left planted, right lifted */}
            <g className="pet-leg-a" fill="var(--wood-dark)">
              <rect x="4" y="13" width="3" height="2" />
              <rect x="9" y="13" width="3" height="1" />
            </g>
            <g className="pet-leg-a" fill="var(--shadow-block)">
              <rect x="4" y="15" width="3" height="1" />
              <rect x="9" y="14" width="3" height="1" />
            </g>

            {/* Legs — walk frame B: right planted, left lifted */}
            <g className="pet-leg-b" fill="var(--wood-dark)">
              <rect x="4" y="13" width="3" height="1" />
              <rect x="9" y="13" width="3" height="2" />
            </g>
            <g className="pet-leg-b" fill="var(--shadow-block)">
              <rect x="4" y="14" width="3" height="1" />
              <rect x="9" y="15" width="3" height="1" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
