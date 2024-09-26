export const locales = ["en", "tr"] as const;

declare global {
  export type Locale = (typeof locales)[number];
}
