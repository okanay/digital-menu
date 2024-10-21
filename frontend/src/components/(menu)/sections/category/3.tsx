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
    attributes: { url, description },
    nodes: { Title, Description, ImageWrapper = DefaultNodeWrapper },
  }) => {
    return (
      <div className="relative border-b border-b-primary-200/30">
        {/* Image */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-end">
          <ImageWrapper
            className={`group pointer-events-auto relative h-full w-full overflow-hidden bg-black/30`}
          >
            <ImageDisplay url={url} description={description} />
          </ImageWrapper>
        </div>
        {/* Title, Description */}
        <div className="flex h-full flex-col items-center justify-end text-balance px-4 pb-4 pt-10 text-center">
          {/* Title */}
          <div className="relative z-[20] w-fit min-w-[15%] max-w-full rounded-t-lg font-custom-serif text-6xl font-thin text-primary-50">
            <Title />
          </div>
          {/* Description */}
          <div className="relative z-[20] w-fit min-w-[15%] max-w-full rounded-t-lg font-custom-sans text-sm text-primary-50/80">
            <Description />
          </div>
        </div>
      </div>
    );
  },
);
