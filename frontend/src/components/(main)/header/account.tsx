"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/buttons";

export const Account: React.FC = () => {
  return (
    <ul className="hidden items-center justify-end gap-4 2xl:flex">
      <li>
        <ThemeSwitcher />
      </li>
      <li className="-ml-2">
        <LanguageSwitcher />
      </li>
      <li>
        <ButtonPrimary>Sign up</ButtonPrimary>
      </li>
      <li className="-ml-2">
        <ButtonSecondary>Log in</ButtonSecondary>
      </li>
    </ul>
  );
};
