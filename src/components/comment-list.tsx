"use client";

import { getComments } from "@/services/common";
import { GetComment } from "@/types";
import { useGSAP } from "@gsap/react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import Image from "next/image";

export default function CommentList() {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".comment-list div", {
      duration: 0.1,
      opacity: 0,
      filter: "blur(7px)",
      y: 50,
      ease: "power2.out",
      stagger: 0.05,
      delay: 0.4,
    });
  });

  const { data, isPending } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      return await getComments();
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const comments = data?.data;

  if (isPending)
    return (
      <div className="text-xs sm:text-sm lg:text-base">
        Wait for a moment please....
      </div>
    );

  if (!comments || comments.length === 0) {
    return (
      <div className="flex items-center justify-center mt-4">
        <Image
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzZoaWx4bzZ0OG9nenEwZ3dxb3JraTRzaTZwb25ha3hoYTY4bXlsciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4yPqi6aqoARYEcRkoY/giphy.gif"
          alt="empty"
          width={100}
          height={100}
          className="w-64 h-64 lg:w-96 lg:h-96 object-cover"
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 mt-4 comment-list">
      {comments?.map((comment: GetComment) => (
        <div
          key={comment.id}
          className="flex items-center justify-between border border-gray-900 dark:border-gray-300 p-2 rounded-md">
          {/* nama dan komentar */}
          <div className="flex items-center gap-2 w-[80%]">
            {/* gambar */}
            <Image
              src={comment.user.avatar}
              alt="profile picture"
              width={100}
              height={100}
              className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
            />

            {/* nama dan komentar */}
            <div>
              <h1 className="text-[10px] lg:text-xs font-bold">
                {comment.user.name}
              </h1>
              <p className="text-xs lg:text-sm">{comment.content}</p>
            </div>
          </div>

          {/* tanggal dan jam */}
          <div className="text-[8px] sm:text-[10px] lg:text-xs flex flex-col items-end w-[20%] justify-center">
            <p>
              {new Date(comment.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p>
              {new Date(comment.createdAt).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
