import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.menuarts.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
};

export default withNextIntl(nextConfig);
