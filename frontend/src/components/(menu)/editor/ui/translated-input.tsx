import useClickOutside from "@/hooks/use-click-outside";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useMenuEditor } from "../use-menu-editor";
import { ContentDisplay, ContentEditInput } from "./content-edit-input";

const dictionary: { [key in Languages]: string } = {
  en: "Edit me!",
  tr: "Beni düzenle!",
  de: "Bearbeite mich!",
  fr: "Édite moi!",
  es: "¡Edítame!",
  it: "Modificami!",
  sa: "عدلني!",
};

function getEditMe(language: Languages): string {
  return dictionary[language];
}

// TranslatedInput.tsx
interface Props extends React.ComponentProps<"div"> {
  path: string[];
  translations: TranslatedField;
  inputClassName?: string;
  displayClassName?: string;
}

// prettier-ignore
export const TranslatedInput: React.FC<Props> = ({ path, translations, className, inputClassName, displayClassName, ...props}) => {
  const { menu, language } = useMenuEditor();
  const { updateTranslatedField } = language;
  const { current } = menu.language;

  const value = translations[current] || getEditMe(current);
  const [text, setText] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsEditing(false);
    updateTranslatedField(path, text);
  }, [path, text, updateTranslatedField]);

  const ref = useClickOutside<HTMLDivElement>(handleOnBlur, isEditing);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div
      {...props}
      ref={ref}
      className={twMerge(
        "relative overflow-hidden rounded border border-corner/0 bg-primary-950/0 transition-colors duration-300 hover:text-primary-50 hover:bg-primary-950",
        isEditing && "border-corner/20 bg-primary-950 duration-500 hover:bg-primary-950 text-primary-50",
        className,
        text.length > 0 ? "" : "h-[40px]",
      )}
    >
      {isEditing ? (
        <ContentEditInput
          text={text}
          onChange={handleChange}
          onBlur={handleOnBlur}
          className={inputClassName}
        />
      ) : (
        <ContentDisplay
          text={text}
          onClick={() => setIsEditing(true)}
          className={twMerge(
            text.length > 0 ? "" : "h-full min-w-[40px]",
            displayClassName
          )}
        />
      )}
    </div>
  );
};
