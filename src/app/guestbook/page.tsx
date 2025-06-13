import GuestbookPage from "@/components/pages/guestbook-page";
import { Metadata } from "next";

const title = "Guestbook Portofolio | Evan Stefanus";
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

export default function Guestbook() {
  return (
    <div>
      <GuestbookPage />
    </div>
  );
}
