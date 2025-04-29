/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconType } from "react-icons/lib";
import { SiGithub, SiGooglechrome } from "react-icons/si";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useQuery } from "@tanstack/react-query";
import { getGithubUser } from "@/services/common";
import { IconLoader3 } from "@tabler/icons-react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: number;
    title: string;
    description: string;
    source: string;
    image: StaticImageData;
    link: string;
    tech?: IconType[];
    collab?: string;
  }[];
  className?: string;
}) => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".card-project .hasil-project", {
      duration: 0.15,
      opacity: 0,
      filter: "blur(7px)",
      y: 50,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.2,
    });
  });

  const username = items
    .filter((item) => item.collab)
    .map((item) => item.collab);

  const { data, isPending } = useQuery({
    queryKey: ["users-profile"],
    queryFn: async () => {
      // di cek terlebih dahulu apakah username array ada
      if (username.length > 0) {
        // Buat array of promises dengan memanggil getGithubUser untuk setiap username
        const promises = username.map((user) => getGithubUser(user as string));
        // Menjalankan semua promise secara parallel dan menunggu semua selesai
        return await Promise.all(promises);
      }
      return [];
    },
  });

  const usernameToDataMap: any = {};
  if (data) {
    data.forEach((user) => {
      if (user && user.login) {
        usernameToDataMap[user.login] = user;
      }
    });
  }

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 py-5", className)}>
      {items.map((item, idx) => (
        <div
          key={item?.id}
          className="relative group block p-3 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full block bg-gray-900/60 dark:bg-gray-300/60 rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="card-project">
            <Card className="hasil-project">
              <div className="relative w-full aspect-video">
                <Image src={item.image} alt="" fill className="object-cover" />
                {/* jika ada collab maka tampilkan */}
                {item.collab &&
                  (isPending ? (
                    <div className="absolute top-2 right-1 bg-gray-300 dark:bg-gray-900 p-1 rounded-md">
                      <IconLoader3 className="animate-spin text-gray-900 dark:text-gray-300 w-5 h-5" />
                    </div>
                  ) : (
                    usernameToDataMap[item.collab] && (
                      <Link
                        href={usernameToDataMap[item.collab].html_url}
                        target="_blank"
                        className="absolute top-2 right-1 text-[11px] bg-gray-200 dark:bg-gray-800 p-1 rounded-md flex items-center gap-1 text-gray-900 dark:text-gray-300">
                        <p>Collab With</p>
                        <div className="flex items-center gap-1">
                          <p>{usernameToDataMap[item.collab].login}</p>
                          <Image
                            src={usernameToDataMap[item.collab].avatar_url}
                            alt=""
                            width={100}
                            height={100}
                            className="rounded-full w-4 h-4"
                          />
                        </div>
                      </Link>
                    )
                  ))}
              </div>

              <div className="p-4">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="line-clamp-5 mt-3">
                  {item.description}
                </CardDescription>
                {/* tech icons */}
                {item.tech && (
                  <div className="flex gap-3 my-3">
                    {item.tech.map((Icon, idx) => (
                      <Icon
                        key={idx}
                        className="text-2xl text-gray-900 dark:text-gray-300"
                      />
                    ))}
                  </div>
                )}
                {/* link source code and project */}
                <div className="flex items-center gap-3 text-gray-900 dark:text-gray-300">
                  {/* github */}
                  {item.source === "private" ? (
                    <button
                      className="bg-red-600 p-1 rounded-sm hover:cursor-not-allowed text-gray-300"
                      disabled>
                      <div className="flex items-center gap-1">
                        <SiGithub className="text-lg" />
                        <h1 className="text-xs">Private</h1>
                      </div>
                    </button>
                  ) : (
                    <Link
                      href={item.source}
                      target="_blank"
                      className="bg-gray-300 dark:bg-gray-900 p-1 rounded-sm hover:cursor-pointer">
                      <div className="flex items-center gap-1">
                        <SiGithub className="text-lg" />
                        <h1 className="text-xs">
                          {item.title === "API Books"
                            ? "Documentation"
                            : "Source"}
                        </h1>
                      </div>
                    </Link>
                  )}

                  {/* link to web */}
                  {item.title === "Diary App" ? (
                    <button
                      className="bg-red-600 p-1 rounded-sm text-gray-300 hover:cursor-not-allowed"
                      disabled>
                      <div className="flex items-center gap-1">
                        <SiGooglechrome className="text-lg" />
                        <h1 className="text-xs">Maintenance</h1>
                      </div>
                    </button>
                  ) : (
                    item.title !== "API Books" && (
                      <Link
                        href={item.link}
                        target="_blank"
                        className="bg-gray-300 dark:bg-gray-900 p-1 rounded-sm hover:cursor-pointer">
                        <div className="flex items-center gap-1">
                          <SiGooglechrome className="text-lg" />
                          <h1 className="text-xs">Preview</h1>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl h-full w-full overflow-hidden bg-gray-200 dark:bg-gray-800 relative z-20",
        className
      )}>
      <div className="relative z-50">{children}</div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-gray-900 dark:text-gray-300 font-bold tracking-wide",
        className
      )}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-gray-900 dark:text-gray-300 leading-relaxed text-xs",
        className
      )}>
      {children}
    </p>
  );
};
