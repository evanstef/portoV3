"use client";

import { data } from "@/data-project/data-project";
import { HoverEffect } from "../ui/card-hover-effect";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";

export default function ProjectPage() {
  const projectPage = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".title-project", {
        duration: 0.1,
        opacity: 0,
        filter: "blur(7px)",
        y: 50,
        ease: "power2.out",
      }).from(".desc-project", {
        duration: 0.1,
        opacity: 0,
        filter: "blur(7px)",
        y: 50,
        ease: "power2.out",
      });
    },
    { scope: projectPage }
  );
  return (
    <div ref={projectPage} className="space-y-4 xl:space-y-6">
      <div className="space-y-4 border-b border-gray-900 dark:border-gray-300 pb-4 mb-4">
        <h1 className="text-base sm:text-lg lg:text-2xl font-bold title-project">
          a lot experiment and projects are here
        </h1>
        <p className="text-xs sm:text-sm lg:text-base desc-project">
          This is a collection of my projects and experiments. You can find
          various projects that I have worked on and some experiments that I
          have done. I hope you find them interesting and useful.
        </p>
      </div>
      {/* list of projects */}
      <HoverEffect items={data} />
    </div>
  );
}
