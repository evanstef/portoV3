"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ModeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [rightOffset, setRightOffset] = useState(0);

  useEffect(() => {
    function updateOffset() {
      const containerWidth = 768; // 3xl = 768px
      const windowWidth = window.innerWidth;
      const offset = Math.max(0, (windowWidth - containerWidth) / 2);
      setRightOffset(offset);
    }

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      style={{ right: `${rightOffset + 20}px` }}
      className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-300 dark:bg-gray-900 border-gray-900 fixed bottom-[26px] dark:border-gray-300 hover:cursor-pointer border z-50"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode">
      {theme === "dark" ? (
        <IconSun className="w-5 h-5 lg:h-6 lg:w-6 text-gray-300" />
      ) : (
        <IconMoon className="w-5 h-5 lg:h-6 lg:w-6 text-gray-900" />
      )}
    </button>
  );
}
