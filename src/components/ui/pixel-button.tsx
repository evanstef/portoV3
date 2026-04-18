"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const pixelButton = cva(
  "font-pixel inline-flex items-center justify-center gap-2 pixel-border pixel-step select-none active:translate-x-0 active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent-pink)] text-[var(--bg)] pixel-shadow-sm hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md",
        cyan: "bg-[var(--accent-cyan)] text-[var(--bg)] pixel-shadow-sm hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md",
        lime: "bg-[var(--accent-lime)] text-[var(--bg)] pixel-shadow-sm hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md",
        ghost:
          "bg-transparent text-[var(--fg)] pixel-shadow-sm hover:-translate-x-[2px] hover:-translate-y-[2px] hover:pixel-shadow-md hover:bg-[var(--bg-elevated)]",
        link: "border-0 shadow-none bg-transparent text-[var(--accent-cyan)] underline underline-offset-4 hover:text-[var(--accent-pink)]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type PixelButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof pixelButton>;

const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(pixelButton({ variant, size }), className)}
      {...props}
    />
  )
);
PixelButton.displayName = "PixelButton";

export { PixelButton, pixelButton };
