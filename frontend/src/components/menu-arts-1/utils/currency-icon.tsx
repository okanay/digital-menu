import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  currency: Currency;
};

export const CurrencyIcon = ({ className, style, currency }: Props) => {
  return (
    <span
      className={twMerge(className)}
      style={{
        ...style,
        order: GetCurrencyOrder(currency),
      }}
    >
      {GetCurrencyIcon(currency)}
    </span>
  );
};

export const GetCurrencyOrder = (currency: Currency) => {
  switch (currency) {
    case "USD":
    case "EUR":
    case "GBP":
    case "JPY":
    case "CNY":
    case "RUB":
      return 0;
    case "TRY":
      return 1;
    default:
      return 0;
  }
};

export const GetCurrencyIcon = (currency: Currency) => {
  switch (currency) {
    case "TRY":
      return "₺";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "JPY":
      return "¥";
    case "CNY":
      return "¥";
    case "RUB":
      return "₽";
    default:
      return currency;
  }
};
