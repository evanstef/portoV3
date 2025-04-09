"use client";

import { IconBook, IconCode, IconList } from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";

export default function Navbar() {
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
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-around items-center z-50">
      {/* mobile navbar menu */}
      <FloatingDock items={links} />
    </div>
  );
}
