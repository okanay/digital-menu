"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Theme = "light" | "dark" | "loading";

export const useGetActiveTheme = () => {
  const {resolvedTheme, setTheme} = useTheme();
  const [theme, setActiveTheme] = useState<Theme>("loading");

  useEffect(() => {
    if (resolvedTheme === "light") setActiveTheme("light");
    else if (resolvedTheme === "dark") setActiveTheme("dark");
  }, [resolvedTheme]);

  return { theme, setTheme };
};
