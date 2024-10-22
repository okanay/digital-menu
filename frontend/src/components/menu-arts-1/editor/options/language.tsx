import useClickOutside from "@/hooks/use-click-outside";
import { LanguagesIcon } from "lucide-react";
import { FlagButton, LangDictionary } from "@/components/ui/flag-icon";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import { locales } from "@/utils/locales";
import { useState } from "react";
import { useMenuEditor } from "../../hooks/use-menu-editor";

export const MenuLanguage = () => {
  const editor = useMenuEditor();
  const { active } = editor.menu.language;
  const { setLanguage, addLanguage, removeLanguage } = editor.language;

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const ref = useClickOutside<HTMLDivElement>(handleClose, open);

  const toggleLanguage = (lang: Languages) => {
    if (active.includes(lang)) {
      removeLanguage(lang);
    } else {
      addLanguage(lang);
    }
  };

  return (
    <div ref={ref} className="relative inline-block">
      <div className="group">
        <ModalExplanation>Language Settings</ModalExplanation>
        <button
          className="inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 hover:opacity-75 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
          onClick={() => setOpen(!open)}
        >
          <LanguagesIcon className="size-5 text-black dark:text-white" />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 z-[110] mt-1.5 w-40 origin-top-right">
          <div className="flex flex-col gap-2 rounded border border-corner/10 bg-fill py-1 text-sm">
            {locales.map((lang) => (
              <LanguageItem
                key={lang}
                lang={lang}
                isActive={active.includes(lang)}
                toggleLanguage={toggleLanguage}
                setLanguage={setLanguage}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface LanguageItem {
  lang: Languages;
  isActive: boolean;
  toggleLanguage: (lang: Languages) => void;
  setLanguage: (lang: Languages) => void;
}

const LanguageItem = ({
  lang,
  isActive,
  toggleLanguage,
  setLanguage,
}: LanguageItem) => {
  return (
    <div className="flex cursor-pointer items-center justify-between px-2 hover:bg-primary-100 dark:hover:bg-primary-800">
      <button
        className="flex w-full items-center gap-4 text-sm"
        onClick={() => {
          setLanguage(lang);
        }}
      >
        <FlagButton lang={lang} />
        <LangDictionary lang={lang} />
      </button>
      <input
        type="checkbox"
        checked={isActive}
        onChange={() => toggleLanguage(lang)}
        className="form-checkbox h-4 w-4 text-primary-600"
      />
    </div>
  );
};
