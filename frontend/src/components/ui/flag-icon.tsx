import { DE, ES, FR, GB, IT, SA, TR } from "country-flag-icons/react/3x2";

interface FlagIcon {
  lang: Languages;
}

export const FlagButton = ({ lang }: FlagIcon) => {
  switch (lang) {
    case "tr":
      return <TR className="size-8" />;
    case "en":
      return <GB className="size-8" />;
    case "fr":
      return <FR className="size-8" />;
    case "de":
      return <DE className="size-8" />;
    case "sa":
      return <SA className="size-8" />;
    case "es":
      return <ES className="size-8" />;
    case "it":
      return <IT className="size-8" />;
    default:
      return <></>;
  }
};

interface LangDictionary {
  lang: Languages;
}

export const LangDictionary = ({ lang }: LangDictionary) => {
  switch (lang) {
    case "tr":
      return <span>Türkçe</span>;
    case "en":
      return <span>English</span>;
    case "fr":
      return <span>Français</span>;
    case "de":
      return <span>Deutsch</span>;
    case "sa":
      return <span>العربية</span>;
    case "es":
      return <span>Español</span>;
    case "it":
      return <span>Italiano</span>;
    default:
      return <></>;
  }
};
