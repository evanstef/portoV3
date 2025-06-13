import ProjectPage from "@/components/pages/project-page";
import { Metadata } from "next";

const title = "Projects Portofolio | Evan Stefanus";
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

export default function Projects() {
  return (
    <div>
      <ProjectPage />
    </div>
  );
}
