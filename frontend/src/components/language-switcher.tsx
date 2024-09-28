"use client";

import useClickOutside from "@/hooks/use-click-outside";
import { useCallback, useState } from "react";
import { ImageTW } from "./ui/image-tw";
import { ModalExplanation } from "./ui/modal-explanation";
import { useLanguage } from "@/hooks/use-language";

const languageOptions = [
  {
    language: "en" as Locale,
    svg: "/svgs/uk.svg",
    label: "English",
  },
  {
    language: "tr" as Locale,
    svg: "/svgs/tr.svg",
    label: "Turkish",
  },
];

export const LanguageSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false);
  const setLocal = useLanguage();

  const handleClose = useCallback(() => setOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(handleClose);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div className="group">
        <ModalExplanation>Switch Language</ModalExplanation>
        <button
          className="inline-flex h-[2.5rem] items-center justify-center rounded-md border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 hover:opacity-75 active:scale-95"
          onClick={() => setOpen(!open)}
        >
          <ImageTW
            src={"/svgs/globe.svg"}
            alt="moon svg"
            className="w-5 dark:invert"
          />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 mt-1.5 w-24 origin-top-right">
          <div className="flex flex-col items-start rounded border border-corner/10 bg-fill text-sm">
            {languageOptions.map((option) => (
              <button
                key={option.language}
                className="group flex w-full items-center gap-2 bg-fill-primary/0 px-2 py-1.5 transition-colors duration-300 hover:bg-fill-primary/30"
                onClick={() => {
                  setOpen(false);
                  setLocal(option.language);
                }}
              >
                <ImageTW
                  alt={`${option.label} svg`}
                  src={option.svg}
                  className="w-4 transition-all duration-300 group-active:scale-90"
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
