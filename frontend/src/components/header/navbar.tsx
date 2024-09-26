"use client";

import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";

const Navbar: React.FC = () => {
  const { setLocale } = useLanguage();
  const { session, user } = useAuth();

  return (
    <nav className="flex items-center justify-between gap-2">
      {session === "authorize" && (
        <div className="flex items-center gap-2">Logout</div>
      )}

      {session === "unauthorize" && (
        <div className="flex items-center gap-2">Login</div>
      )}
    </nav>
  );
};

export default Navbar;
