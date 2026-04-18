"use client";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { SiGithub, SiGooglechrome } from "react-icons/si";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useQuery } from "@tanstack/react-query";
import { getGithubUser } from "@/services/common";
import { IconLoader3 } from "@tabler/icons-react";
import { getProjectSlug } from "@/data-project/data-project";

type ProjectItem = {
  id: number;
  title: string;
  description: string;
  source: string;
  image: StaticImageData;
  link: string;
  tech?: IconType[];
  collab?: string;
};

type GithubUserProfile = {
  login: string;
  avatar_url: string;
  html_url: string;
};

type HoverEffectProps = {
  items: ProjectItem[];
  className?: string;
};

export const HoverEffect = ({ items, className }: HoverEffectProps) => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".card-project", {
      duration: 0.15,
      opacity: 0,
      filter: "blur(6px)",
      y: 40,
      ease: "steps(4)",
      stagger: 0.08,
      delay: 0.2,
    });
  });

  const usernames = items
    .map((item) => item.collab)
    .filter((name): name is string => Boolean(name));

  const { data, isPending } = useQuery<GithubUserProfile[]>({
    queryKey: ["users-profile", usernames],
    queryFn: async () => {
      if (usernames.length === 0) return [];
      const responses = await Promise.all(
        usernames.map((user) => getGithubUser(user) as Promise<GithubUserProfile>)
      );
      return responses;
    },
    enabled: usernames.length > 0,
  });

  const collabMap: Record<string, GithubUserProfile> = {};
  if (data) {
    data.forEach((user) => {
      if (user?.login) collabMap[user.login] = user;
    });
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4 py-4", className)}>
      {items.map((item) => {
        const slug = getProjectSlug(item.title);
        const collabProfile =
          item.collab && collabMap[item.collab]
            ? collabMap[item.collab]
            : null;
        return (
          <article key={item.id} className="card-project relative">
            <Link
              href={`/projects/${slug}`}
              aria-label={`View details for ${item.title}`}
              className="block bg-[var(--bg-elevated)] pixel-border pixel-shadow-md pixel-step hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-lg hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-[var(--accent-cyan)]"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover pixel-image"
                />
              </div>

              <div className="p-4 border-t-[3px] border-[var(--pixel-border)]">
                <h3 className="font-pixel text-xs lg:text-sm text-[var(--accent-pink)]">
                  {item.title.toUpperCase()}
                </h3>
                <p className="text-[var(--fg-muted)] leading-relaxed text-xs mt-3 line-clamp-4">
                  {item.description}
                </p>

                {item.tech && (
                  <div className="flex flex-wrap gap-2.5 my-3 items-center">
                    {item.tech.slice(0, 6).map((Icon, idx) => (
                      <Icon key={idx} className="text-lg text-[var(--fg)]" />
                    ))}
                    {item.tech.length > 6 && (
                      <span className="font-pixel text-[9px] text-[var(--fg-muted)]">
                        +{item.tech.length - 6}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t-[2px] border-[var(--pixel-border)]">
                  <span className="font-pixel text-[9px] text-[var(--accent-cyan)]">
                    &gt; VIEW DETAILS
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.source !== "private" && (
                      <SiGithub className="text-sm text-[var(--fg-muted)]" />
                    )}
                    {item.title !== "Diary App" &&
                      item.title !== "API Books" && (
                        <SiGooglechrome className="text-sm text-[var(--fg-muted)]" />
                      )}
                  </div>
                </div>
              </div>
            </Link>

            {item.collab && isPending && (
              <div className="absolute top-5 right-5 z-10 bg-[var(--bg)] pixel-border pixel-shadow-sm p-1">
                <IconLoader3 className="animate-spin text-[var(--accent-cyan)] w-4 h-4" />
              </div>
            )}
            {collabProfile && (
              <a
                href={collabProfile.html_url}
                target="_blank"
                rel="noreferrer"
                className="absolute top-5 right-5 z-10 text-[10px] bg-[var(--bg)] pixel-border pixel-shadow-sm px-1.5 py-1 flex items-center gap-1.5 text-[var(--fg)] hover:text-[var(--accent-cyan)]"
              >
                <span className="font-pixel">COLLAB</span>
                <div className="flex items-center gap-1">
                  <span>{collabProfile.login}</span>
                  <div className="pixel-border pixel-image">
                    <Image
                      src={collabProfile.avatar_url}
                      alt={collabProfile.login}
                      width={100}
                      height={100}
                      className="w-4 h-4 pixel-image block"
                      unoptimized
                    />
                  </div>
                </div>
              </a>
            )}
          </article>
        );
      })}
    </div>
  );
};
