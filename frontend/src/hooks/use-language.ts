"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export const useLanguage = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();

  function setLocale(newLocale: Locale): void {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return { locale, setLocale };
};
