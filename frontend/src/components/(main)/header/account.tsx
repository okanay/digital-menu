"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/buttons";
import { Link } from "@/providers/i18n/routing";

export const Account: React.FC = () => {
  return (
    <ul className="hidden items-center justify-end gap-4 lg:flex">
      <li>
        <ThemeSwitcher />
      </li>
      <li className="-ml-2">
        <LanguageSwitcher />
      </li>
      <li>
        <Link href={"/sign-up"}>
          <ButtonPrimary>Sign Up</ButtonPrimary>
        </Link>
      </li>
      <li className="-ml-2">
        <Link href={"/sign-in"}>
          <ButtonSecondary>Sign In</ButtonSecondary>
        </Link>
      </li>
    </ul>
  );
};
