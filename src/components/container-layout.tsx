"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

export default function ContainerLayout({ children }: Props) {
  const queryClient: QueryClient = new QueryClient();

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
