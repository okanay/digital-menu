export const locales = ["de", "en", "tr", "es", "fr", "it", "sa"] as const;

declare global {
  type Languages = (typeof locales)[number];
}
