import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
