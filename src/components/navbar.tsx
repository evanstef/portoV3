"use client";

import { IconBook, IconCode, IconList } from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const links = [
    {
      title: "about",
      icon: <IconList className="h-full w-full" />,
      href: "/",
    },
    {
      title: "projects",
      icon: <IconCode className="h-full w-full" />,
      href: "/projects",
    },
    {
      title: "guestbook",
      icon: <IconBook className="h-full w-full" />,
      href: "/guestbook",
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
        items={links}
        desktopClassName={show ? "translate-y-0" : "translate-y-50"}
      />
    </div>
  );
}
