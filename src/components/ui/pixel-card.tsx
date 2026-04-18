"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type PixelCardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "elevated" | "dialog";
};

export const PixelCard = forwardRef<HTMLDivElement, PixelCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClass =
      variant === "elevated"
        ? "pixel-shadow-md"
        : variant === "dialog"
          ? "pixel-shadow-lg"
          : "pixel-shadow-sm";
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--bg-elevated)] pixel-border p-4",
          variantClass,
          className
        )}
        {...props}
      />
    );
  }
);
PixelCard.displayName = "PixelCard";
