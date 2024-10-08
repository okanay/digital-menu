// @ts-check

const withNextIntl = require("next-intl/plugin")(
  "./src/providers/i18n/request.ts",
);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.menuarts.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = withNextIntl(config);
