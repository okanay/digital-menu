import React from "react";
import { twMerge } from "tailwind-merge";
import { CurrencyIcon } from "../../utils/currency-icon";

type PriceDisplayProps = {
  price: Price;
  currency: Currency;
  children: React.ReactNode;
  containerClass?: string;
  currencyClass?: string;
  currentPriceClass?: string;
  originalPriceClass?: string;
};

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  currency,
  children,
  containerClass,
  currencyClass,
  currentPriceClass,
  originalPriceClass,
}) => {
  const isDiscounted = price.discount?.isActive;
  const currentPrice = isDiscounted
    ? calculateDiscountedPrice(price.discount!.percentage, price.value)
    : price.value;

  return (
    <div
      className={twMerge("pointer-events-auto relative z-[20]", containerClass)}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-start gap-0.5">
          <CurrencyIcon
            className={twMerge("text-sm", currencyClass)}
            currency={currency}
          />
          <div
            className={twMerge(
              "font-custom-mono text-2xl font-bold text-primary-900 dark:text-primary-100",
              currentPriceClass,
            )}
          >
            {isDiscounted ? currentPrice : children}
          </div>
        </div>
        {isDiscounted && (
          <div
            className={twMerge(
              "text-sm text-gray-500 line-through",
              originalPriceClass,
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

function calculateDiscountedPrice(percentage: number, value: number): number {
  const discountAmount = (percentage / 100) * value;
  return parseFloat((value - discountAmount).toFixed(2));
}
