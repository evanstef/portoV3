"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const baseInputClass =
  "w-full bg-[var(--bg-sunken)] pixel-border px-3 py-2 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus-visible:outline-none focus-visible:border-[var(--accent-cyan)] focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:opacity-50 disabled:cursor-not-allowed";

export type PixelInputProps = InputHTMLAttributes<HTMLInputElement>;

export const PixelInput = forwardRef<HTMLInputElement, PixelInputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(baseInputClass, "h-10", className)}
      {...props}
    />
  )
);
PixelInput.displayName = "PixelInput";

export type PixelTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const PixelTextarea = forwardRef<HTMLTextAreaElement, PixelTextareaProps>(
  ({ className, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(baseInputClass, "resize-y min-h-[96px]", className)}
      {...props}
    />
  )
);
PixelTextarea.displayName = "PixelTextarea";
