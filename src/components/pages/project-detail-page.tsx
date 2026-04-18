"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { IconArrowLeft } from "@tabler/icons-react";
import { SiGithub, SiGooglechrome } from "react-icons/si";
import {
  getProjectBySlug,
  type TechDetail,
} from "@/data-project/data-project";

type Props = {
  slug: string;
};

const ROLE_LABELS: Record<TechDetail["role"], string> = {
  frontend: "FRONT-END",
  backend: "BACK-END",
  database: "DATABASE",
  deploy: "DEPLOY",
  design: "DESIGN",
  state: "STATE",
  other: "OTHER",
};

const ROLE_COLORS: Record<TechDetail["role"], string> = {
  frontend: "var(--accent-cyan)",
  backend: "var(--accent-pink)",
  database: "var(--accent-lime)",
  deploy: "var(--accent-yellow)",
  design: "var(--accent-cyan)",
  state: "var(--accent-lime)",
  other: "var(--fg-muted)",
};

export default function ProjectDetailPage({ slug }: Props) {
  const project = getProjectBySlug(slug);
  const pageRef = useRef(null);

  useGSAP(
    () => {
      if (!project) return;
      const tl = gsap.timeline();
      const common = {
        duration: 0.12,
        opacity: 0,
        filter: "blur(6px)",
        y: 40,
        ease: "steps(4)",
      };
      tl.from(".detail-back", common)
        .from(".detail-hero", common)
        .from(".detail-image", { ...common, y: 0, x: 40 })
        .from(".detail-desc", common)
        .from(".detail-tech", common)
        .from(".detail-gallery > *", { ...common, stagger: 0.05 })
        .from(".detail-actions", common);
    },
    { scope: pageRef, dependencies: [slug] }
  );

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <h1 className="font-pixel text-2xl text-[var(--accent-pink)]">
          GAME OVER
        </h1>
        <p className="font-pixel text-xs text-[var(--fg-muted)]">
          &gt; project not found
        </p>
        <Link
          href="/projects"
          className="font-pixel bg-[var(--accent-pink)] text-[var(--bg)] pixel-border pixel-shadow-sm pixel-step px-4 py-2 text-xs hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md"
        >
          [ BACK ]
        </Link>
      </div>
    );
  }

  const isPrivate = project.source === "private";
  const isMaintenance = project.title === "Diary App";
  const isDocsOnly = project.title === "API Books";

  const gallery =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];

  return (
    <div ref={pageRef} className="space-y-5">
      <Link
        href="/projects"
        className="detail-back font-pixel inline-flex items-center gap-2 bg-[var(--bg-elevated)] text-[var(--fg)] pixel-border pixel-shadow-sm pixel-step px-3 py-2 text-[10px] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md hover:text-[var(--accent-cyan)]"
      >
        <IconArrowLeft className="w-4 h-4" />
        <span>BACK TO PROJECTS</span>
      </Link>

      <div aria-hidden className="pixel-divider" />

      <section className="detail-hero flex flex-col gap-3">
        <h1 className="font-pixel text-base sm:text-xl lg:text-2xl text-[var(--accent-pink)] leading-tight">
          {project.title.toUpperCase()}
        </h1>
        <p className="font-mono text-xs text-[var(--accent-cyan)]">
          &gt; project://{project.id}/{project.title.toLowerCase().replace(/\s+/g, "-")}
        </p>
      </section>

      <div className="detail-image relative w-full aspect-video pixel-border pixel-shadow-lg pixel-image overflow-hidden bg-[var(--bg-elevated)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover pixel-image"
          priority
        />
      </div>

      <section className="detail-desc space-y-3">
        <h2 className="font-pixel text-xs sm:text-sm text-[var(--accent-lime)]">
          &gt; README.MD
        </h2>
        <div className="bg-[var(--bg-elevated)] pixel-border pixel-shadow-sm p-4">
          <p className="text-xs sm:text-sm lg:text-base text-[var(--fg)] leading-relaxed whitespace-pre-wrap">
            {project.longDescription ?? project.description}
          </p>
        </div>

        {project.features && project.features.length > 0 && (
          <div className="bg-[var(--bg-elevated)] pixel-border pixel-shadow-sm p-4 mt-3">
            <h3 className="font-pixel text-[10px] sm:text-xs text-[var(--accent-yellow)] mb-3">
              &gt; FEATURES
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs sm:text-sm text-[var(--fg)]"
                >
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 bg-[var(--accent-pink)] mt-1.5 shrink-0"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="detail-tech space-y-3">
        <h2 className="font-pixel text-xs sm:text-sm text-[var(--accent-cyan)]">
          &gt; TECH_STACK.LOG
        </h2>
        {project.techDetail && project.techDetail.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.techDetail.map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="flex items-center gap-3 bg-[var(--bg-elevated)] pixel-border pixel-shadow-sm p-3"
              >
                <t.Icon className="text-2xl text-[var(--fg)] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm font-bold text-[var(--fg)] truncate">
                    {t.name}
                  </p>
                  <p
                    className="font-pixel text-[9px] uppercase tracking-wider"
                    style={{ color: ROLE_COLORS[t.role] }}
                  >
                    {ROLE_LABELS[t.role]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--bg-elevated)] pixel-border pixel-shadow-sm p-4 flex flex-wrap gap-4">
            {project.tech.map((Icon, idx) => (
              <Icon key={idx} className="text-2xl text-[var(--fg)]" />
            ))}
          </div>
        )}
      </section>

      {gallery.length > 1 && (
        <section className="space-y-3">
          <h2 className="font-pixel text-xs sm:text-sm text-[var(--accent-yellow)]">
            &gt; GALLERY
          </h2>
          <div className="detail-gallery grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gallery.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-video pixel-border pixel-shadow-sm pixel-image overflow-hidden bg-[var(--bg-elevated)]"
              >
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  fill
                  className="object-cover pixel-image"
                  unoptimized={typeof img === "string"}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <div aria-hidden className="pixel-divider" />

      <section className="detail-actions flex flex-wrap gap-3">
        {isPrivate ? (
          <button
            type="button"
            disabled
            className="font-pixel inline-flex items-center gap-2 bg-[var(--destructive)] text-[var(--bg)] pixel-border pixel-shadow-sm px-3 py-2 text-xs cursor-not-allowed opacity-75"
          >
            <SiGithub className="text-base" />
            <span>PRIVATE REPO</span>
          </button>
        ) : (
          <a
            href={project.source}
            target="_blank"
            rel="noreferrer"
            className="font-pixel inline-flex items-center gap-2 bg-[var(--accent-pink)] text-[var(--bg)] pixel-border pixel-shadow-sm pixel-step px-3 py-2 text-xs hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md"
          >
            <SiGithub className="text-base" />
            <span>{isDocsOnly ? "DOCUMENTATION" : "VIEW SOURCE"}</span>
          </a>
        )}

        {isMaintenance ? (
          <button
            type="button"
            disabled
            className="font-pixel inline-flex items-center gap-2 bg-[var(--destructive)] text-[var(--bg)] pixel-border pixel-shadow-sm px-3 py-2 text-xs cursor-not-allowed opacity-75"
          >
            <SiGooglechrome className="text-base" />
            <span>UNDER MAINTENANCE</span>
          </button>
        ) : !isDocsOnly ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="font-pixel inline-flex items-center gap-2 bg-[var(--accent-cyan)] text-[var(--bg)] pixel-border pixel-shadow-sm pixel-step px-3 py-2 text-xs hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md"
          >
            <SiGooglechrome className="text-base" />
            <span>LIVE PREVIEW</span>
          </a>
        ) : null}
      </section>
    </div>
  );
}
