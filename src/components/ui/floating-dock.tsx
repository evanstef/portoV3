"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

type DockItem = {
  title: string;
  icon: ReactNode;
  href: string;
  type: "link" | "button";
};

type FloatingDockProps = {
  items: DockItem[];
  desktopClassName?: string;
  setTheme: (value: string) => void;
  theme: string | undefined;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  setTheme,
  theme,
}: FloatingDockProps) => (
  <div
    className={cn(
      "bg-[var(--bg-elevated)] pixel-border pixel-shadow-md px-2 py-2 flex items-end gap-2 transition-transform duration-300 ease-[steps(3)]",
      desktopClassName
    )}
  >
    {items.map((item) => (
      <DockIcon key={item.title} item={item} setTheme={setTheme} theme={theme} />
    ))}
  </div>
);

type DockIconProps = {
  item: DockItem;
  setTheme: (value: string) => void;
  theme: string | undefined;
};

function DockIcon({ item, setTheme, theme }: DockIconProps) {
  const pathname = usePathname();
  const isActive = item.type === "link" && pathname === item.href;
  const [hovered, setHovered] = useState(false);

  const boxClass = cn(
    "relative flex items-center justify-center h-10 w-10 pixel-border pixel-step",
    isActive
      ? "bg-[var(--accent-pink)] text-[var(--bg)]"
      : "bg-[var(--bg)] text-[var(--fg)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md hover:text-[var(--accent-pink)]"
  );

  const content = (
    <div
      className={boxClass}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-5 w-5">{item.icon}</div>
      {hovered && (
        <span className="font-pixel absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--bg)] text-[var(--fg)] pixel-border pixel-shadow-sm px-2 py-0.5 text-[10px] uppercase tracking-wider">
          {item.title}
        </span>
      )}
    </div>
  );

  if (item.type === "button") {
    return (
      <button
        type="button"
        aria-label={item.title}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={item.href} aria-label={item.title}>
      {content}
    </Link>
  );
}
