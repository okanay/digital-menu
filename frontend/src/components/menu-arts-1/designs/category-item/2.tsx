import React from "react";
import { AllergensDisplay } from "./allergens";
import { ImageDisplay } from "../image-display";
import { DefaultNodeWrapper } from "../node-wrapper";
import { PriceDisplay } from "./price";

type Props = {
  attributes: {
    url: string;
    description: string;
    allergens?: number[];
    currency: Currency;
    price: Price;
  };
  nodes: {
    Title: React.ElementType;
    Description: React.ElementType;
    Price: React.ElementType;
    ImageWrapper?: React.ComponentType<NodeWrapperProps>;
  };
};

export const CategoryItem2: React.FC<Props> = React.memo(
  ({
    attributes: { url, description, allergens, currency, price },
    nodes: { Title, Description, Price, ImageWrapper = DefaultNodeWrapper },
  }) => {
    return (
      <div className="relative px-6 py-4 font-custom-sans">
        <div className="flex min-h-[100px] w-full items-center justify-between gap-8">
          {/* Content */}
          <div className="flex w-full flex-col justify-between">
            <div className="flex max-w-[60%] flex-wrap items-center gap-x-4 gap-y-1">
              {/* Title */}
              <div className="relative z-[20] w-fit rounded-t-lg font-custom-serif text-lg text-primary-50">
                <Title />
              </div>
              {/* Price */}
              <PriceDisplay
                currency={currency}
                price={price}
                currencyClass="text-primary-50/80"
                currentPriceClass="text-primary-50/80"
              >
                <Price />
              </PriceDisplay>
            </div>

            {/* Description */}
            <div className="relative z-[20] mb-1 w-fit max-w-[60%] text-pretty rounded-t-lg font-custom-sans text-sm text-primary-50/80">
              <Description />
            </div>
            {/* Allergens */}
            <AllergensDisplay
              allergens={allergens || []}
              className="max-w-[60%]"
            />
          </div>
          {/* Image */}
          <ImageWrapper className="group absolute right-0 h-full w-full flex-shrink-0 overflow-hidden bg-gradient-to-l from-black/60 via-primary-950/40 to-black/60">
            <ImageDisplay url={url} description={description} />
          </ImageWrapper>
        </div>
      </div>
    );
  },
);
