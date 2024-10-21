"use client";
import useClickOutside from "@/hooks/use-click-outside";
import { useLanguage } from "@/hooks/use-language";
import { locales } from "@/utils/locales";
import { useCallback, useState } from "react";
import { FlagButton, LangDictionary } from "./ui/flag-icon";
import { IconImage } from "./ui/icon-image";
import { ModalExplanation } from "./ui/modal-explanation";

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
          className="inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 hover:opacity-75 active:scale-95"
          onClick={() => setOpen(!open)}
        >
          <IconImage
            src={"/svgs/globe.svg"}
            alt="moon svg"
            className="w-5 dark:invert"
          />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 mt-1.5 w-28 origin-top-right">
          <div className="flex flex-col items-start rounded border border-corner/10 bg-fill text-sm">
            {locales.map((option) => (
              <button
                key={option + "switcher"}
                className="group flex w-full items-center gap-2 bg-fill-primary/0 px-2 py-1.5 transition-colors duration-300 hover:bg-fill-primary/30"
                onClick={() => {
                  setOpen(false);
                  setLocal(option as Languages);
                }}
              >
                <FlagButton lang={option as Languages} />
                <LangDictionary lang={option as Languages} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
