import type { Metadata } from "next";
import "./globals.css";

const title = "Amalia Madden | Theoretical Particle Physicist";
const description =
  "Amalia Madden's personal corner of the web: dark matter, AI agents, and physics beyond the Standard Model.";
const [owner = "", repository = ""] =
  process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isUserSite = repository === `${owner}.github.io`;
const basePath = owner && repository && !isUserSite ? `/${repository}` : "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (owner && repository
    ? `https://${owner}.github.io${basePath}/`
    : "http://localhost:3000/");
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
