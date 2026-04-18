"use client";

import { getComments } from "@/services/common";
import { GetComment } from "@/types";
import { useGSAP } from "@gsap/react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import Image from "next/image";

type CommentsResponse = {
  data?: GetComment[];
};

export default function CommentList() {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".comment-list > *", {
      duration: 0.12,
      opacity: 0,
      filter: "blur(6px)",
      y: 40,
      ease: "steps(4)",
      stagger: 0.04,
      delay: 0.3,
    });
  });

  const { data, isPending } = useQuery<CommentsResponse>({
    queryKey: ["comments"],
    queryFn: getComments,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24 * 3,
  });

  const comments = data?.data;

  if (isPending) {
    return (
      <div className="font-pixel text-xs sm:text-sm lg:text-base text-[var(--accent-cyan)]">
        &gt; loading messages...
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-4 pixel-border pixel-shadow-md bg-[var(--bg-elevated)] p-6">
        <Image
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzZoaWx4bzZ0OG9nenEwZ3dxb3JraTRzaTZwb25ha3hoYTY4bXlsciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4yPqi6aqoARYEcRkoY/giphy.gif"
          alt="empty guestbook"
          width={100}
          height={100}
          className="w-48 h-48 lg:w-64 lg:h-64 object-cover pixel-image"
          unoptimized
        />
        <p className="font-pixel text-xs sm:text-sm text-[var(--fg-muted)] mt-3">
          &gt; no messages yet. be the first!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-2 comment-list">
      {comments.map((comment: GetComment) => (
        <article
          key={comment.id}
          className="flex items-start gap-3 bg-[var(--bg-elevated)] pixel-border pixel-shadow-sm p-3"
        >
          <div className="pixel-border pixel-image shrink-0">
            <Image
              src={comment.user.avatar}
              alt={comment.user.name}
              width={100}
              height={100}
              className="w-10 h-10 lg:w-12 lg:h-12 pixel-image block"
              unoptimized
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-pixel text-xs lg:text-sm font-bold text-[var(--accent-pink)] truncate">
                {comment.user.name}
              </h3>
              <div className="font-pixel text-[9px] sm:text-[10px] lg:text-xs text-[var(--fg-muted)] flex flex-col items-end shrink-0">
                <span>
                  {new Date(comment.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span>
                  {new Date(comment.createdAt).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
            <p className="text-xs lg:text-sm text-[var(--fg)] mt-1 break-words">
              {comment.content}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
