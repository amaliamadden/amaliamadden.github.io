import type { NextConfig } from "next";

const [owner = "", repository = ""] =
  process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isUserSite = repository === `${owner}.github.io`;
const basePath = owner && repository && !isUserSite ? `/${repository}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
