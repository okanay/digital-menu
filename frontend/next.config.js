// @ts-check

const withNextIntl = require("next-intl/plugin")(
  "./src/providers/i18n/request.ts",
);

/** @type {import('next').NextConfig} */
const config = {};

module.exports = withNextIntl(config);
