import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr", "de", "fr", "es", "it", "sa"] as const,
  defaultLocale: "en",
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

// import { createSharedPathnamesNavigation } from "next-intl/navigation";
// import { defineRouting } from "next-intl/routing";

// export const routing = defineRouting({
//   locales: ["en", "tr", "de", "fr", "es", "it", "sa"] as const,
//   defaultLocale: "en",
//   localePrefix: "always",
// });

// export type Locale = (typeof routing.locales)[number];
// export const { Link, redirect, usePathname, useRouter } =
//   createSharedPathnamesNavigation(routing);
