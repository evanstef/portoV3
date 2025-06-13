/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { setupQueryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import LoadingScene from "./loading-scene";

type Props = {
  children: React.ReactNode;
};

export default function ContainerLayout({ children }: Props) {
  const [queryClient, setQueryClient] = useState<any>(null);

  useEffect(() => {
    setQueryClient(setupQueryClient());
  }, []);

  if (!queryClient)
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LoadingScene />
      </ThemeProvider>
    );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="container max-w-3xl relative mx-auto px-4 py-4 sm:px-6 md:py-7 flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
