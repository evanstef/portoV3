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
                className="absolute inset-0 h-full w-full block bg-gray-900/60 rounded-3xl"
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
              </div>

              <div className="p-4">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="line-clamp-4 mt-3">
                  {item.description}
                </CardDescription>
                {/* tech icons */}
                {item.tech && (
                  <div className="flex gap-3 my-3">
                    {item.tech.map((Icon, idx) => (
                      <Icon key={idx} className="text-2xl text-gray-300" />
                    ))}
                  </div>
                )}
                {/* link source code and project */}
                <div className="flex items-center gap-3 text-gray-900">
                  {/* github */}
                  <Link
                    href={item.source}
                    target="_blank"
                    className="bg-gray-300 p-1 rounded-sm hover:cursor-pointer">
                    <div className="flex items-center gap-1">
                      <SiGithub className="text-lg" />
                      <h1 className="text-xs">Source</h1>
                    </div>
                  </Link>

                  {/* link to web */}
                  {item.title === "Diary App" ? (
                    <button
                      className="bg-red-500 p-1 rounded-sm text-gray-300"
                      disabled>
                      <h1 className="text-xs">Maintenance</h1>
                    </button>
                  ) : (
                    <Link
                      href={item.link}
                      target="_blank"
                      className="bg-gray-300 p-1 rounded-sm hover:cursor-pointer">
                      <div className="flex items-center gap-1">
                        <SiGooglechrome className="text-lg" />
                        <h1 className="text-xs">Preview</h1>
                      </div>
                    </Link>
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
        "rounded-xl h-full w-full overflow-hidden bg-gray-900 relative z-20",
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
    <h4 className={cn("text-gray-300 font-bold tracking-wide", className)}>
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
    <p className={cn("text-gray-300 leading-relaxed text-xs", className)}>
      {children}
    </p>
  );
};
