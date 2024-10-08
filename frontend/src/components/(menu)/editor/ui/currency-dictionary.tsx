import { twMerge } from "tailwind-merge";

interface CurrencyDictionary {
  currency: Currency;
  className?: string;
  style?: React.CSSProperties;
}

export const CurrencyDictionary = ({
  currency,
  className,
  style,
}: CurrencyDictionary) => {
  switch (currency) {
    case "USD":
      return (
        <span style={style} className={twMerge("", className)}>
          $
        </span>
      );
    case "EUR":
      return (
        <span style={style} className={twMerge("", className)}>
          €
        </span>
      );
    case "GBP":
      return (
        <span style={style} className={twMerge("", className)}>
          £
        </span>
      );
    case "JPY":
      return (
        <span style={style} className={twMerge("", className)}>
          ¥
        </span>
      );
    case "CNY":
      return (
        <span style={style} className={twMerge("", className)}>
          ¥
        </span>
      );
    case "RUB":
      return (
        <span style={style} className={twMerge("", className)}>
          ₽
        </span>
      );
    case "TRY":
      return (
        <span style={style} className={twMerge("order-2", className)}>
          ₺
        </span>
      );
    default:
      return (
        <span style={style} className={twMerge("", className)}>
          €
        </span>
      );
  }
};
