import useClickOutside from "@/hooks/use-click-outside";
import { useState, useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useMenuEditor } from "../use-menu-editor";

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

export const TranslatedInput: React.FC<Props> = ({
  path,
  translations,
  className,
  inputClassName,
  displayClassName,
  ...props
}) => {
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
        "relative z-[38] rounded border border-corner/0 bg-fill/0 transition-colors duration-300 hover:bg-fill",
        isEditing && "border-corner/20 bg-fill duration-500 hover:bg-fill",
        className,
      )}
    >
      {isEditing ? (
        <TranslatedEditor
          text={text}
          onChange={handleChange}
          onBlur={handleOnBlur}
          className={inputClassName}
        />
      ) : (
        <TranslatedDisplay
          text={text}
          onClick={() => setIsEditing(true)}
          className={displayClassName}
        />
      )}
    </div>
  );
};

// TranslatedEditor.tsx
interface TranslatedEditorProps {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  className?: string;
}

const TranslatedEditor = ({
  text,
  onChange,
  onBlur,
  className,
}: TranslatedEditorProps) => (
  <div className="flex-col] flex">
    <input
      type="text"
      value={text}
      onChange={onChange}
      onBlur={onBlur}
      className={twMerge(
        "bg-transparent px-4 py-2 focus:outline-none",
        className,
      )}
      autoFocus
    />
  </div>
);

// TranslatedDisplay.tsx
interface TranslatedDisplayProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const TranslatedDisplay = ({
  text,
  onClick,
  className,
}: TranslatedDisplayProps) => (
  <h2
    onClick={onClick}
    className={twMerge(
      "cursor-pointer break-words rounded border border-corner/0 hover:border-corner/10",
      className,
    )}
  >
    {text}
  </h2>
);
