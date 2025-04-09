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

      tl.from(".title-guestbook", {
        duration: 0.1,
        opacity: 0,
        filter: "blur(7px)",
        y: 50,
        ease: "power2.out",
      })
        .from(".text-guestbook", {
          duration: 0.1,
          opacity: 0,
          filter: "blur(7px)",
          y: 50,
          ease: "power2.out",
        })
        .from(".auth-guestbook", {
          duration: 0.1,
          opacity: 0,
          filter: "blur(7px)",
          y: 50,
          ease: "power2.out",
        })
        .from(".input-guestbook", {
          duration: 0.1,
          opacity: 0,
          filter: "blur(7px)",
          y: 50,
          ease: "power2.out",
        });
    },
    { scope: guestbookPage }
  );

  const user = session?.user;
  const isAuthChecking = status === "loading";

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("github", { callbackUrl: "/guestbook" });
  };

  // logic untuk membuat komentar
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: async () =>
      await createComment({
        comment: getValues("comment"),
        user_id: user?.id as string,
      }),
    onSuccess: async () => {
      // reset form
      reset();
      // refrecth comments list
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
    <div ref={guestbookPage}>
      <div className="space-y-4 border-b border-gray-900 dark:border-gray-300 pb-4 mb-4">
        <h1 className="text-base sm:text-lg lg:text-2xl font-bold title-guestbook">
          guestbook and leave a message...
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-guestbook">
          Welcome to my digital guestbook! Just like the nostalgic guestbooks of
          personal websites in the early internet days, this space is yours to
          leave a message, share feedback, or simply say hello. but sorry you
          have to login Github first
        </p>
        <div className="auth-guestbook">
          {isAuthChecking ? (
            // Tampilkan loading saat memeriksa status auth
            <div className="flex items-center gap-2">
              <IconLoader3 className="animate-spin w-4 h-4 lg:w-6 lg:h-6" />
              <p className="text-xs sm:text-sm lg:text-base">
                Checking login status...
              </p>
            </div>
          ) : user ? (
            <div className="text-xs sm:text-sm lg:text-base flex items-center gap-2">
              <p>Hello,</p>
              <div className="font-bold">{user.name}👋!!</div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSignIn}
              disabled={isLoading}
              className={`flex items-center gap-2 border border-gray-900 dark:border-gray-300 p-2 hover:bg-gray-900 dark:hover:bg-gray-300 duration-300 hover:text-gray-300 dark:hover:text-gray-900 ease-in-out rounded-md ${
                isLoading
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:cursor-pointer"
              }`}>
              <div className="text-xs sm:text-sm lg:text-base">
                Sign In With Github
              </div>
              <SiGithub className="text-base lg:text-xl" />
            </button>
          )}
        </div>
      </div>

      {/* input message */}
      {user && (
        <div className="flex items-start gap-2 border-b border-gray-900 dark:border-gray-300 pb-4 mb-4 input-guestbook">
          <p className="text-xs sm:text-sm lg:text-base whitespace-nowrap mt-2">
            Message :
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <input
                {...register("comment")}
                type="text"
                className="border border-gray-900 dark:border-gray-300 rounded-lg p-2 text-xs sm:text-sm w-full lg:text-base focus:outline-none"
                placeholder="Leave a message for Evan..."
                autoComplete="off"
              />
              {errors.comment && (
                <p className="text-red-500 text-xs sm:text-sm lg:text-base">
                  {errors.comment.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={createCommentMutation.isPending}
              className="flex items-center gap-2 bg-gray-900 dark:bg-gray-300 p-2 rounded-md hover:cursor-pointer text-gray-300 dark:text-gray-900 whitespace-nowrap">
              {createCommentMutation.isPending ? (
                <IconLoader3 className="animate-spin w-4 h-4 lg:w-6 lg:h-6" />
              ) : (
                <>
                  <p className="text-xs sm:text-sm lg:text-base">Send</p>
                  <IconSend2 className="w-4 h-4 lg:w-6 lg:h-6" />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* list of message */}
      <CommentList />
    </div>
  );
}
