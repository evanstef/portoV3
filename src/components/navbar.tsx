"use client";

import {
  IconBook,
  IconCode,
  IconList,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, setTheme } = useTheme();

  const links = [
    {
      title: "about",
      icon: <IconList className="h-full w-full" />,
      href: "/",
      type: "link" as const,
    },
    {
      title: "projects",
      icon: <IconCode className="h-full w-full" />,
      href: "/projects",
      type: "link" as const,
    },
    {
      title: "guestbook",
      icon: <IconBook className="h-full w-full" />,
      href: "/guestbook",
      type: "link" as const,
    },
    {
      title: "theme",
      icon:
        theme === "dark" ? (
          <IconSun className="h-full w-full" />
        ) : (
          <IconMoon className="h-full w-full" />
        ),
      href: "#",
      type: "button" as const,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          setShow(false);
        } else {
          setShow(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-around items-center z-50">
      <FloatingDock
        setTheme={setTheme}
        theme={theme}
        items={links}
        desktopClassName={show ? "translate-y-0" : "translate-y-24"}
      />
    </div>
  );
}
