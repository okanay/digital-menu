import { ImageDisplay } from "../image-display";
import { DefaultNodeWrapper } from "../node-wrapper";
import React from "react";

type Props = {
  attributes: {
    url: string;
    description: string;
    locale: string;
  };
  nodes: {
    Title: React.ElementType;
    Description: React.ElementType;
    ImageWrapper?: React.ComponentType<NodeWrapperProps>;
  };
};

export const Category: React.FC<Props> = React.memo(
  ({
    attributes: { url, description, locale },
    nodes: { Title, Description, ImageWrapper = DefaultNodeWrapper },
  }) => {
    const isArabic = locale === "sa";
    const rounded = isArabic ? "rounded-br-full" : "rounded-bl-full";

    return (
      <div className="relative px-2 py-2">
        {/* Image */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-end">
          <ImageWrapper
            className={`group pointer-events-auto relative h-full max-h-[140px] w-1/2 overflow-hidden ${rounded}`}
          >
            <ImageDisplay url={url} description={description} />
          </ImageWrapper>
        </div>
        {/* Title, Description */}
        <div className="">
          {/* Title */}
          <div className="relative z-[20] mt-2 w-fit min-w-[15%] max-w-[60%] rounded-t-lg font-custom-serif text-5xl text-primary-900 dark:text-primary-100">
            <Title />
          </div>
          {/* Description */}
          <div className="relative z-[20] w-fit min-w-[15%] max-w-[60%] text-balance rounded-t-lg font-custom-sans text-base text-primary-800/80 dark:text-primary-200/80">
            <Description />
          </div>
        </div>
      </div>
    );
  },
);
