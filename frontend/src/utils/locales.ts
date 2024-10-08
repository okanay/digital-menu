export const locales = ["de", "en", "es", "fr", "it", "sa", "tr"] as const;

declare global {
  type Languages = (typeof locales)[number];
}
