import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ContainerLayout from "@/components/container-layout";
import Footer from "@/components/footer";
import TrailingCursor from "@/components/trail-cursor";

const pixelify = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Porto Evan",
  description: "Portofolio Evan V3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelify.className} antialiased bg-gray-300 text-gray-900`}>
        <ContainerLayout>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ContainerLayout>
        <TrailingCursor />
      </body>
    </html>
  );
}
