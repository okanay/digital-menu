export const locales = ["en", "tr"] as const;

declare global {
  type Locale = typeof locales[number];
}
