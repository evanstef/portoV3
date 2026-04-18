"use client";

import { SiGithub } from "react-icons/si";
import { IconLoader3, IconSend2 } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createComment } from "@/services/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentSchema } from "@/schema/common";
import CommentList from "../comment-list";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function GuestbookPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const guestbookPage = useRef(null);

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
      tl.from(".title-guestbook", common)
        .from(".text-guestbook", common)
        .from(".auth-guestbook", common)
        .from(".input-guestbook", common);
    },
    { scope: guestbookPage }
  );

  const user = session?.user;
  const isAuthChecking = status === "loading";

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("github", { callbackUrl: "/guestbook" });
  };

  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: async () =>
      await createComment({
        comment: getValues("comment"),
        user_id: user?.id as string,
      }),
    onSuccess: async () => {
      reset();
      await queryClient.invalidateQueries({
        queryKey: ["comments"],
        refetchType: "active",
      });
    },
    onError: (data) => {
      throw new Error(data.message);
    },
  });

  const {
    formState: { errors },
    getValues,
    reset,
    register,
    handleSubmit,
  } = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
  });

  async function onSubmit() {
    await createCommentMutation.mutateAsync();
  }

  return (
    <div ref={guestbookPage} className="space-y-4">
      <section className="pb-2">
        <h1 className="font-pixel title-guestbook text-base sm:text-xl lg:text-2xl text-[var(--accent-blossom)]">
          &gt; MAIL BOX
        </h1>
        <p className="text-guestbook text-xs sm:text-sm lg:text-base text-[var(--fg-muted)] mt-3 font-mono">
          &gt; drop a letter in the mailbox.
          <br />
          &gt; sign your name with GitHub first.
        </p>
      </section>

      <div aria-hidden className="pixel-divider" />

      {/* Auth dialog box */}
      <section className="auth-guestbook">
        <div className="bg-[var(--bg-elevated)] pixel-border pixel-shadow-md p-4">
          <div className="flex items-center gap-2 font-pixel text-xs uppercase tracking-wider text-[var(--accent-cyan)] mb-3">
            <span
              aria-hidden
              className="inline-block h-2 w-2 bg-[var(--accent-cyan)]"
              style={{ animation: "pixel-blink 1s steps(2) infinite" }}
            />
            <span>session.status</span>
          </div>
          {isAuthChecking ? (
            <div className="flex items-center gap-2 text-[var(--fg-muted)]">
              <IconLoader3 className="animate-spin w-4 h-4 lg:w-5 lg:h-5" />
              <p className="text-xs sm:text-sm">Checking login status...</p>
            </div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <p className="font-pixel text-sm text-[var(--fg)]">HELLO,</p>
              <p className="font-pixel text-sm font-bold text-[var(--accent-pink)]">
                {user.name?.toUpperCase()} {" "}
                <span className="text-[var(--accent-lime)]">👋</span>
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSignIn}
              disabled={isLoading}
              className={`font-pixel inline-flex items-center gap-2 bg-[var(--accent-pink)] text-[var(--bg)] pixel-border pixel-shadow-sm pixel-step px-3 py-2 text-xs sm:text-sm hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md active:translate-x-0 active:translate-y-0 active:shadow-none ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <SiGithub className="text-base lg:text-lg" />
              <span>SIGN IN WITH GITHUB</span>
            </button>
          )}
        </div>
      </section>

      {/* Message input */}
      {user && (
        <section className="input-guestbook">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[var(--bg-elevated)] pixel-border pixel-shadow-md p-4 space-y-3"
          >
            <label className="font-pixel text-xs uppercase tracking-wider text-[var(--accent-lime)] flex items-center gap-2">
              <span>&gt;</span>
              <span>new_message.input</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <div className="flex-1 w-full min-w-0">
                <input
                  {...register("comment")}
                  type="text"
                  className="w-full bg-[var(--bg-sunken)] pixel-border px-3 py-2 text-xs sm:text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--accent-cyan)]"
                  placeholder="type your message..."
                  autoComplete="off"
                />
                {errors.comment && (
                  <p className="text-[var(--destructive)] text-[10px] sm:text-xs mt-1 font-pixel">
                    &gt; {errors.comment.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={createCommentMutation.isPending}
                className={`font-pixel inline-flex items-center gap-2 bg-[var(--accent-cyan)] text-[var(--bg)] pixel-border pixel-shadow-sm pixel-step px-3 py-2 text-xs sm:text-sm hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md active:translate-x-0 active:translate-y-0 active:shadow-none ${
                  createCommentMutation.isPending
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {createCommentMutation.isPending ? (
                  <IconLoader3 className="animate-spin w-4 h-4 lg:w-5 lg:h-5" />
                ) : (
                  <>
                    <span>SEND</span>
                    <IconSend2 className="w-4 h-4 lg:w-5 lg:h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      )}

      <div aria-hidden className="pixel-divider" />

      <CommentList />
    </div>
  );
}
