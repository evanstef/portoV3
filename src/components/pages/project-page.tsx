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
      const common = {
        duration: 0.12,
        opacity: 0,
        filter: "blur(6px)",
        y: 40,
        ease: "steps(4)",
      };
      tl.from(".title-project", common).from(".desc-project", common);
    },
    { scope: projectPage }
  );

  return (
    <div ref={projectPage} className="space-y-4 xl:space-y-6">
      <section className="pb-2">
        <h1 className="font-pixel title-project text-base sm:text-xl lg:text-2xl text-[var(--accent-wheat)]">
          &gt; COMMUNITY CENTER
        </h1>
        <p className="desc-project text-xs sm:text-sm lg:text-base text-[var(--fg-muted)] mt-3 font-mono">
          &gt; projects completed on the farm.
          <br />
          &gt; browse the bulletin board below.
        </p>
      </section>

      <div aria-hidden className="pixel-divider" />

      <HoverEffect items={data} />
    </div>
  );
}
