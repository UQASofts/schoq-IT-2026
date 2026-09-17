import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProdBuild = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProdBuild ? { output: "export" as const } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
