import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ContainerLayout from "@/components/container-layout";
import Footer from "@/components/footer";
import TrailingCursor from "@/components/trail-cursor";
import ModeButton from "@/components/mode-button";

const pixelify = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: "400",
  style: "normal",
});

const title = "Evan Stefanus | Portofolio";
const description = "Digital Guestbook, Portofolio, Projects By Evan Stefanus";
const url = "https://portofolio-evan.vercel.app/";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: [
      {
        url,
        alt: "OG Image",
      },
    ],
    siteName: "portofolio-evan.vercel.app",
  },
  metadataBase: new URL(url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pixelify.className} antialiased bg-gray-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300`}>
        <ContainerLayout>
          <Navbar />
          <ModeButton />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ContainerLayout>
        <TrailingCursor />
      </body>
    </html>
  );
}
