"use client";

import useClickOutside from "@/hooks/use-click-outside";
import { useTheme } from "next-themes";
import { useCallback, useState } from "react";
import { ImageTW } from "./ui/image-tw";
import { ModalExplanation } from "./ui/modal-explanation";

const themeOptions = [
  { theme: "light", svg: "/svgs/sun.svg", label: "Light" },
  { theme: "dark", svg: "/svgs/moon.svg", label: "Dark" },
  { theme: "system", svg: "/svgs/system.svg", label: "System" },
];

export const ThemeSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  const handleClose = useCallback(() => setOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(handleClose);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div className="group">
        <ModalExplanation>Switch Theme</ModalExplanation>
        <button
          className="border-corner/10 bg-fill inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm transition-all duration-300 hover:opacity-75 active:scale-95"
          onClick={() => setOpen(!open)}
        >
          <ImageTW
            src={"/svgs/moon.svg"}
            alt="moon svg"
            className="hidden w-5 dark:block dark:invert"
          />
          <ImageTW
            src={"/svgs/sun.svg"}
            alt="sun svg"
            className="block w-5 dark:hidden dark:invert"
          />
        </button>
      </div>
      {open && (
        <div className="absolute right-0 mt-1.5 w-24 origin-top-right">
          <div className="border-corner/10 bg-fill flex flex-col items-start rounded border text-sm">
            {themeOptions.map((option) => (
              <button
                key={option.theme}
                className="bg-fill-primary/0 hover:bg-fill-primary/30 group flex w-full items-center gap-2 px-2 py-1.5 transition-colors duration-300"
                onClick={() => {
                  setTheme(option.theme);
                  setOpen(false);
                }}
              >
                <ImageTW
                  alt={`${option.label} svg`}
                  src={option.svg}
                  className="w-4 transition-all duration-300 group-active:scale-90 dark:invert"
                />
                <span className="transition-all duration-300 group-active:scale-95">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
