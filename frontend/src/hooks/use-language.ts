"use client";

import { usePathname, useRouter } from "next/navigation"

export const useLanguage = () => {
  const pathname = usePathname();
  const router = useRouter();

  function setLocale(newLocale: Locale): void {}

  return { setLocale };
};
