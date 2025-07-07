"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiNestjs,
  SiLaravel,
  SiExpress,
  SiPhp,
  SiMysql,
  SiMongodb,
  SiNodedotjs,
  SiPrisma,
} from "react-icons/si";
import { LinkPreview } from "../ui/link-preview";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function HomePage() {
  const [hovered, setHovered] = useState(false);
  const containerAbout = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".nama-evan", {
        duration: 0.1,
        opacity: 0,
        filter: "blur(7px)",
        y: 50,
        ease: "power2.out",
      })
        .from(".headline-text", {
          duration: 0.1,
          opacity: 0,
          filter: "blur(7px)",
          y: 50,
          ease: "power2.out",
        })
        .from(".gambar-meme", {
          duration: 0.1,
          opacity: 0,
          filter: "blur(7px)",
          x: 50,
          ease: "power2.out",
        })
        .from(".little-peace", {
          duration: 0.1,
          opacity: 0,
          filter: "blur(7px)",
          y: 50,
          ease: "power2.out",
        })
        .from(".desc-litte-peace", {
          duration: 0.1,
          opacity: 0,
          filter: "blur(7px)",
          y: 50,
          ease: "power2.out",
        })
        .from(".skill-set div", {
          duration: 0.1,
          opacity: 0,
          filter: "blur(7px)",
          y: 30,
          ease: "power2.out",
          stagger: 0.05,
        })
        .from(".experience-title", {
          duration: 0.1,
          opacity: 0,
          filter: "blur(7px)",
          y: 50,
          ease: "power2.out",
        })
        .from(".experience-set div", {
          duration: 0.1,
          opacity: 0,
          filter: "blur(7px)",
          y: 50,
          ease: "power2.out",
          stagger: 0.05,
        });
    },
    { scope: containerAbout }
  );

  return (
    <div ref={containerAbout} className="space-y-4 xl:space-y-6">
      {/* Hero section  */}
      <div className="flex justify-between items-center border-b border-gray-900 dark:border-gray-300 pb-4 gap-10 sm:gap-0">
        {/* Kata kata manis */}
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold nama-evan">
            Hello, I&apos;m Evan
          </h1>
          <p className="text-xs sm:text-sm lg:text-base headline-text">
            just ordinary people love how to code.
          </p>
        </div>

        {/* gambar */}
        <div className="gambar-meme">
          <div
            className={cn(
              "group cursor-pointer overflow-hidden relative rounded-md mx-auto w-28 h-28 sm:w-32 sm:h-32 xl:w-36 xl:h-36 -rotate-6 flex flex-col justify-end p-4",
              "bg-[url('/muka-1.png')] bg-cover bg-center",
              // Preload hover image by setting it in a pseudo-element
              "before:bg-[url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmx4bWVweDRmbzRobWx0dnRqMHNxbW1ma3Z5b2ljOHNzcXR4YWM2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3Owa0TWYqHi5RZYGql/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
              "hover:bg-[url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmx4bWVweDRmbzRobWx0dnRqMHNxbW1ma3Z5b2ljOHNzcXR4YWM2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3Owa0TWYqHi5RZYGql/giphy.gif)]",
              "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
              "transition-all duration-500",
              "text-gray-300 hover:text-gray-900"
            )}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="text relative z-50">
              <h1
                className={`font-bold text-[8px] sm:text-[10px] lg:text-xs relative text-center ${
                  hovered ? "bg-gray-300" : "bg-gray-900"
                } p-1 rounded-xl`}
              >
                {hovered ? "Im Hiding!!" : "Please Hover!!"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="border-b border-gray-900 dark:border-gray-300 pb-4">
        <div className="flex items-center gap-2 little-peace">
          <h1 className="text-base sm:text-lg lg:text-2xl font-bold">
            a little peace of heaven
          </h1>
          <Image
            src={
              "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHRzYTAwcTd1OXdycGJzaGUxbnZucDM0MTd2d3FmY2Rmc3UwNGQ5aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/L4epvaYdygiHV1Z2ET/giphy.gif"
            }
            alt="adwa"
            width={150}
            height={150}
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
          />
        </div>
        <p className="text-xs sm:text-sm lg:text-base desc-litte-peace">
          I enjoy showcasing my skills in a more visual and engaging way. My
          journey in web development has allowed me to create responsive and
          modern designs that prioritize both creativity and user experience. I
          constantly push my limits to craft intuitive and aesthetically
          pleasing interfaces.On the back-end, I specialize in JavaScript and
          PHP, working with frameworks like NextJS, ExpressJS, NestJS, NodeJS,
          and Laravel.
        </p>
      </div>

      {/* Skill Framework and programming language */}
      <div className="space-y-4 border-b border-gray-900 dark:border-gray-300 pb-4 ">
        <div className="grid grid-cols-6 gap-x-8 gap-y-2 sm:grid-cols-8 md:grid-cols-10 sm:gap-x-12 md:gap-x-10 lg:grid-cols-11 xl:gap-10 skill-set">
          {/* Javascript */}
          <div>
            <LinkPreview url="https://www.javascript.com/">
              <SiJavascript className="text-2xl sm:text-3xl duration-300 ease-in-out text-gray-900 dark:text-gray-300 hover:scale-150 hover:text-yellow-400 dark:hover:text-yellow-400 hover:cursor-pointer" />
            </LinkPreview>
          </div>

          {/* TypeScript */}
          <div>
            <LinkPreview url="https://www.typescriptlang.org/">
              <SiTypescript className="text-2xl sm:text-3xl duration-300 ease-in-out dark:hover:text-blue-600 text-gray-900 dark:text-gray-300 hover:scale-150 hover:text-blue-600 hover:cursor-pointer" />
            </LinkPreview>
          </div>

          {/* php */}
          <div>
            <LinkPreview url="https://www.php.net/">
              <SiPhp className="text-2xl sm:text-3xl duration-300 ease-in-out text-gray-900 dark:text-gray-300 hover:scale-150 hover:text-purple-700 dark:hover:text-purple-700 hover:cursor-pointer" />
            </LinkPreview>
          </div>

          {/* Next JS */}
          <div>
            <LinkPreview url="https://nextjs.org/">
              <SiNextdotjs className="text-2xl sm:text-3xl duration-300 ease-in-out text-gray-900 dark:text-gray-300 hover:scale-150 hover:cursor-pointer" />
            </LinkPreview>
          </div>

          {/* node js */}
          <div>
            <LinkPreview url="https://nodejs.org/en">
              <SiNodedotjs className="text-2xl sm:text-3xl duration-300 ease-in-out text-gray-900 dark:text-gray-300 hover:scale-150 hover:text-green-500 dark:hover:text-green-500 hover:cursor-pointer" />
            </LinkPreview>
          </div>

          {/* nest js */}
          <div>
            <LinkPreview url="https://nestjs.com/">
              <SiNestjs className="text-2xl sm:text-3xl duration-300 ease-in-out text-gray-900 dark:hover:text-red-500 dark:text-gray-300 hover:scale-150 hover:text-red-500 hover:cursor-pointer" />
            </LinkPreview>
          </div>

          {/* express js */}
          <div>
            <LinkPreview url="https://expressjs.com/">
              <SiExpress className="text-2xl sm:text-3xl duration-300 ease-in-out text-gray-900 dark:text-gray-300 hover:scale-150 hover:cursor-pointer" />
            </LinkPreview>
          </div>

          {/* laravel */}
          <div>
            <LinkPreview url="https://laravel.com/">
              <SiLaravel className="text-2xl sm:text-3xl duration-300 ease-in-out text-gray-900 dark:text-gray-300 hover:scale-150 hover:text-red-500 dark:hover:text-red-500 hover:cursor-pointer" />
            </LinkPreview>
          </div>

          {/* prisma */}
          <div>
            <LinkPreview url="https://www.prisma.io/">
              <SiPrisma className="text-2xl sm:text-3xl duration-300 ease-in-out text-gray-900 dark:text-gray-300 hover:scale-150 hover:text-green-400 dark:hover:text-green-400 hover:cursor-pointer" />
            </LinkPreview>
          </div>

          {/* mongodb */}
          <div>
            <LinkPreview url="https://www.mongodb.com/">
              <SiMongodb className="text-2xl sm:text-3xl duration-300 ease-in-out text-gray-900 dark:text-gray-300 hover:scale-150 hover:text-green-500 dark:hover:text-green-500 hover:cursor-pointer" />
            </LinkPreview>
          </div>

          {/* mysql */}
          <div>
            <LinkPreview url="https://www.mysql.com/">
              <SiMysql className="text-2xl sm:text-3xl duration-300 ease-in-out text-gray-900 dark:text-gray-300 hover:scale-150 hover:text-yellow-500 dark:hover:text-yellow-500 hover:cursor-pointer" />
            </LinkPreview>
          </div>
        </div>
      </div>

      {/* Exprerience */}
      <div className="space-y-4 border-b border-gray-900 dark:border-gray-300 pb-4">
        <h1 className="text-base sm:text-lg lg:text-2xl font-bold experience-title">
          Experience
        </h1>

        <div className="experience-set space-y-4">
          {/* Linkupcareer.id */}
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-sm line-clamp-1 lg:text-lg font-bold">
                Linkupcareer.id
              </h1>
              <p className="text-[10px] sm:text-xs lg:text-base">
                Jul 2025 - present
              </p>
            </div>
            <p className="text-xs sm:text-sm lg:text-base">
              Frontend Developer
            </p>
          </div>

          {/* Puskesmas PangkalBalam */}
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-sm line-clamp-1 lg:text-lg font-bold">
                Puskesmas PangkalBalam
              </h1>
              <p className="text-[10px] sm:text-xs lg:text-base">
                Mar 2025 - present
              </p>
            </div>
            <p className="text-xs sm:text-sm lg:text-base">
              Software Developer
            </p>
          </div>

          {/* Freelance */}
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-sm line-clamp-1 lg:text-lg font-bold">
                Freelance
              </h1>
              <p className="text-[10px] sm:text-xs lg:text-base">
                2024 - present
              </p>
            </div>
            <p className="text-xs sm:text-sm lg:text-base">Web Developer</p>
          </div>

          {/* PT CADADUSA ACINTYA DAKARA */}
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-sm line-clamp-1 lg:text-lg font-bold">
                PT Cadadusa Acintya Dakara
              </h1>
              <p className="text-[10px] sm:text-xs lg:text-base">
                Aug 2024 - Dec 2024
              </p>
            </div>
            <p className="text-xs sm:text-sm lg:text-base">
              Front End Web Developer Intern
            </p>
          </div>

          {/* BB Diesel */}
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-sm line-clamp-1 lg:text-lg font-bold">
                BB Diesel
              </h1>
              <p className="text-[10px] sm:text-xs lg:text-base">
                Mei 2021 - Jul 2023
              </p>
            </div>
            <p className="text-xs sm:text-sm lg:text-base">
              Administator Staff
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
