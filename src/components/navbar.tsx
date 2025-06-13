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
      type: "link",
    },
    {
      title: "projects",
      icon: <IconCode className="h-full w-full" />,
      href: "/projects",
      type: "link",
    },
    {
      title: "guestbook",
      icon: <IconBook className="h-full w-full" />,
      href: "/guestbook",
      type: "link",
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
      type: "button",
    },
  ];

  // membuat floating dock bersembunyi jika browser di kunjung di scroll
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // Scroll ke bawah - sembunyikan navbar
          setShow(false);
        } else {
          // Scroll ke atas - tampilkan navbar
          setShow(true);
        }

        // Update posisi scroll terakhir
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
      {/* mobile navbar menu */}
      <FloatingDock
        setTheme={setTheme}
        theme={theme}
        items={links}
        desktopClassName={show ? "translate-y-0" : "translate-y-50"}
      />
    </div>
  );
}
