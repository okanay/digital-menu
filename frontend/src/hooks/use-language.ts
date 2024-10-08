"use client";
import { usePathname, useRouter } from "@/providers/i18n/routing";

export const useLanguage = () => {
  const pathanme = usePathname();
  const router = useRouter();

  function setLocale(newLocale: Languages): void {
    router.push(pathanme, { locale: newLocale });
  }

  return setLocale;
};
