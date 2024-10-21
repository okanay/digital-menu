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
      <div className="relative border-b border-b-primary-200/30 px-6 py-4">
        <div className="flex flex-col items-center justify-center">
          {/* Image */}
          <ImageWrapper
            className={`group relative h-[100px] w-full overflow-hidden rounded-lg`}
          >
            <ImageDisplay url={url} description={description} />
          </ImageWrapper>
          {/* Title */}
          <div className="relative z-[20] mt-2 w-fit min-w-[15%] max-w-full rounded-t-lg font-custom-serif text-xl text-primary-900 dark:text-primary-100">
            <Title />
          </div>
          {/* Description */}
          <div className="relative z-[20] w-fit min-w-[15%] max-w-full rounded-t-lg font-custom-sans text-sm text-primary-800/80 dark:text-primary-200/80">
            <Description />
          </div>
        </div>
      </div>
    );
  },
);
