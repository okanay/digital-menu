"use client";

import { useLanguage } from "@/hooks/use-language";

const Navbar: React.FC = () => {
  const { setLocale } = useLanguage();

  return (
    <nav className="flex items-center justify-between gap-2">
      <button
        onClick={() => setLocale("en")}
        className="border-primary-950/10 size-8 rounded border"
      >
        🇺🇸
      </button>
      <button
        onClick={() => setLocale("tr")}
        className="border-primary-950/10 size-8 rounded border"
      >
        🇹🇷
      </button>
    </nav>
  );
};

export default Navbar;
