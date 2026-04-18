import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import ContainerLayout from "@/components/container-layout";
import Footer from "@/components/footer";
import PixelCursor from "@/components/pixel-cursor";
import PixelPet from "@/components/pixel-pet";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: "400",
  style: "normal",
  display: "swap",
});

const pressStart = localFont({
  src: "./fonts/PressStart2P-Regular.ttf",
  variable: "--font-press-start",
  display: "swap",
  weight: "400",
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
        className={`${geistMono.variable} ${pressStart.variable} font-mono antialiased`}
      >
        <ContainerLayout>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ContainerLayout>
        <PixelCursor />
        <PixelPet />
      </body>
    </html>
  );
}
