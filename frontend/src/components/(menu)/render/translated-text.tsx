import { twMerge } from "tailwind-merge";

interface TranslatedTextProps extends React.ComponentProps<"span"> {
  translations: TranslatedField;
  locale: string;
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({
  translations,
  className,
  locale,
  ...props
}) => {
  const text = translations[locale] || getEditMe(locale as Languages) || "";
  return (
    <span {...props} className={twMerge("text-text", className)}>
      {text}
    </span>
  );
};

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
