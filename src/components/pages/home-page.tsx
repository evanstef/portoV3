"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import {
  SiExpress,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPrisma,
  SiTypescript,
} from "react-icons/si";

type Skill = {
  name: string;
  url: string;
  Icon: React.ComponentType<{ className?: string }>;
  tint: string;
};

const skills: Skill[] = [
  { name: "JS", url: "https://www.javascript.com/", Icon: SiJavascript, tint: "var(--accent-wheat)" },
  { name: "TS", url: "https://www.typescriptlang.org/", Icon: SiTypescript, tint: "var(--accent-water)" },
  { name: "PHP", url: "https://www.php.net/", Icon: SiPhp, tint: "var(--accent-blossom)" },
  { name: "NEXT", url: "https://nextjs.org/", Icon: SiNextdotjs, tint: "var(--fg)" },
  { name: "NODE", url: "https://nodejs.org/en", Icon: SiNodedotjs, tint: "var(--accent-leaf)" },
  { name: "NEST", url: "https://nestjs.com/", Icon: SiNestjs, tint: "var(--accent-blossom)" },
  { name: "EXP", url: "https://expressjs.com/", Icon: SiExpress, tint: "var(--fg-muted)" },
  { name: "LARA", url: "https://laravel.com/", Icon: SiLaravel, tint: "var(--accent-lantern)" },
  { name: "PRIS", url: "https://www.prisma.io/", Icon: SiPrisma, tint: "var(--accent-leaf)" },
  { name: "MGDB", url: "https://www.mongodb.com/", Icon: SiMongodb, tint: "var(--accent-leaf)" },
  { name: "SQL", url: "https://www.mysql.com/", Icon: SiMysql, tint: "var(--accent-wheat)" },
];

type Experience = {
  company: string;
  role: string;
  period: string;
  season: "spring" | "summer" | "fall" | "winter";
};

const experiences: Experience[] = [
  { company: "Pulau Intan Lestari", role: "Full Stack Developer", period: "Nov 2025 – present", season: "winter" },
  { company: "Linkupcareer.id", role: "Frontend Developer", period: "Jul 2025 – Dec 2025", season: "summer" },
  { company: "Puskesmas PangkalBalam", role: "Software Developer", period: "Apr 2025 – Aug 2025", season: "spring" },
  { company: "PT Cadadusa Acintya Dakara", role: "Front End Web Developer Intern", period: "Aug 2024 – Dec 2024", season: "fall" },
  { company: "BB Diesel", role: "Administrator Staff", period: "Mei 2021 – Jul 2023", season: "summer" },
];

const SEASON_ICON: Record<Experience["season"], string> = {
  spring: "❀",
  summer: "☀",
  fall: "♤",
  winter: "❄",
};

const SEASON_COLOR: Record<Experience["season"], string> = {
  spring: "var(--accent-blossom)",
  summer: "var(--accent-wheat)",
  fall: "var(--accent-lantern)",
  winter: "var(--accent-water)",
};

export default function HomePage() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      const common = {
        duration: 0.15,
        opacity: 0,
        filter: "blur(6px)",
        y: 40,
        ease: "steps(4)",
      };
      tl.from(".farm-hero", common)
        .from(".farm-intro", common)
        .from(".about-card", common)
        .from(".inv-title", common)
        .from(".inv-slot", { ...common, stagger: 0.04 })
        .from(".log-title", common)
        .from(".log-entry", { ...common, stagger: 0.05 });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="space-y-6">
      {/* ============= Hero: wooden bulletin board ============= */}
      <section className="farm-hero relative bg-[var(--bg-elevated)] pixel-border pixel-shadow-md p-5 sm:p-6 overflow-hidden">
        {/* Decorative nail pins */}
        <span
          aria-hidden
          className="absolute top-2 left-2 h-2 w-2 bg-[var(--wood-dark)]"
        />
        <span
          aria-hidden
          className="absolute top-2 right-2 h-2 w-2 bg-[var(--wood-dark)]"
        />
        <span
          aria-hidden
          className="absolute bottom-2 left-2 h-2 w-2 bg-[var(--wood-dark)]"
        />
        <span
          aria-hidden
          className="absolute bottom-2 right-2 h-2 w-2 bg-[var(--wood-dark)]"
        />

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-pixel text-[9px] sm:text-[10px] text-[var(--accent-lantern)] mb-3">
              &gt; STARDEW VALLEY &middot; DAY 1
            </p>
            <h1 className="font-pixel text-base sm:text-xl lg:text-2xl text-[var(--fg)] leading-tight">
              WELCOME TO
              <br />
              <span className="text-[var(--accent-leaf)]">EVAN&apos;S FARM</span>
            </h1>
            <p className="farm-intro text-xs sm:text-sm lg:text-base text-[var(--fg-muted)] mt-4 font-mono">
              &gt; a full-stack developer planting code
              <br />
              &gt; and harvesting web apps since 2024.
            </p>
          </div>

          {/* Tiny pixel farm house */}
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            className="shrink-0 hidden sm:block"
            style={{ shapeRendering: "crispEdges" }}
            aria-hidden
          >
            {/* Roof */}
            <g fill="var(--destructive)">
              <rect x="11" y="3" width="2" height="1" />
              <rect x="10" y="4" width="4" height="1" />
              <rect x="9" y="5" width="6" height="1" />
              <rect x="8" y="6" width="8" height="1" />
              <rect x="7" y="7" width="10" height="1" />
              <rect x="6" y="8" width="12" height="1" />
            </g>
            {/* Walls */}
            <g fill="var(--wood-light)">
              <rect x="7" y="9" width="10" height="10" />
            </g>
            {/* Door */}
            <g fill="var(--wood-dark)">
              <rect x="10" y="13" width="3" height="6" />
              <rect x="12" y="16" width="1" height="1" />
            </g>
            {/* Window */}
            <g fill="var(--accent-water)">
              <rect x="14" y="11" width="2" height="2" />
            </g>
            {/* Grass */}
            <g fill="var(--accent-leaf)">
              <rect x="4" y="19" width="16" height="1" />
              <rect x="3" y="20" width="18" height="1" />
            </g>
          </svg>
        </div>
      </section>

      {/* ============= Inventory (Skills) ============= */}
      <section className="space-y-3">
        <div className="inv-title flex items-center justify-between">
          <h2 className="font-pixel text-sm sm:text-base lg:text-xl text-[var(--accent-wheat)]">
            &gt; INVENTORY
          </h2>
          <span className="font-pixel text-[9px] sm:text-[10px] text-[var(--fg-muted)]">
            {skills.length}/11 SLOTS
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
          {skills.map(({ name, url, Icon, tint }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              title={name}
              className={cn(
                "inv-slot group relative flex flex-col items-center justify-center aspect-square",
                "bg-[var(--bg-elevated)] pixel-border pixel-shadow-sm pixel-step",
                "hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md"
              )}
            >
              <Icon
                className="text-xl sm:text-2xl transition-colors"
              />
              <span className="font-pixel text-[7px] sm:text-[8px] text-[var(--fg-muted)] mt-1 leading-none">
                {name}
              </span>
            </a>
          ))}
        </div>
      </section>

      <div aria-hidden className="pixel-divider" />

      {/* ============= About: character profile ============= */}
      <section className="about-card bg-[var(--bg-elevated)] pixel-border pixel-shadow-sm p-5">
        <h2 className="font-pixel text-sm sm:text-base lg:text-xl text-[var(--accent-water)] mb-4">
          &gt; PROFILE.TXT
        </h2>
        <p className="font-mono text-xs sm:text-sm lg:text-base text-[var(--fg)] leading-relaxed">
          I enjoy showcasing my skills in a more visual and engaging way. My
          journey in web development has allowed me to create responsive and
          modern designs that prioritize both creativity and user experience.
          I constantly push my limits to craft intuitive and aesthetically
          pleasing interfaces. On the back-end, I specialize in JavaScript
          and PHP, working with frameworks like NextJS, ExpressJS, NestJS,
          NodeJS, and Laravel.
        </p>
      </section>

      <div aria-hidden className="pixel-divider" />

      {/* ============= Farm History (Experience) ============= */}
      <section className="space-y-3">
        <div className="log-title flex items-center gap-2">
          <h2 className="font-pixel text-sm sm:text-base lg:text-xl text-[var(--accent-leaf)]">
            &gt; FARM.LOG
          </h2>
          <span className="font-pixel text-[9px] sm:text-[10px] text-[var(--fg-muted)]">
            [{experiences.length} ENTRIES]
          </span>
        </div>

        <div className="space-y-3">
          {experiences.map((exp) => (
            <article
              key={exp.company}
              className="log-entry relative bg-[var(--bg-elevated)] pixel-border pixel-shadow-sm p-4"
            >
              {/* Parchment corner fold */}
              <span
                aria-hidden
                className="absolute top-0 right-0 w-0 h-0 border-solid border-t-[12px] border-t-[var(--bg-sunken)] border-l-[12px] border-l-transparent"
              />

              <div className="flex items-start gap-3">
                <span
                  className="font-pixel text-base sm:text-lg shrink-0 w-6 text-center"
                  style={{ color: SEASON_COLOR[exp.season] }}
                  aria-label={`${exp.season} season`}
                >
                  {SEASON_ICON[exp.season]}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-mono text-sm lg:text-base font-bold text-[var(--fg)]">
                      {exp.company}
                    </h3>
                    <span className="font-pixel text-[8px] sm:text-[9px] lg:text-[10px] text-[var(--fg-muted)] whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-[var(--fg-muted)] mt-1">
                    {exp.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
