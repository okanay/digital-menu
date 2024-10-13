"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/buttons";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "@/providers/i18n/routing";

export const Account: React.FC = () => {
  const { session, signOut } = useAuth();

  return (
    <ul className="hidden items-center justify-end gap-4 lg:flex">
      <li>
        <ThemeSwitcher />
      </li>
      <li className="-ml-2">
        <LanguageSwitcher />
      </li>
      {session !== "authorize" ? (
        <>
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
        </>
      ) : (
        <>
          <li className="-ml-2">
            <Link href={"/dashboard"}>
              <ButtonPrimary>Dashboard</ButtonPrimary>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};
