import React from "react";

type Props = {
  nodes: {
    Title: React.ElementType;
    Description: React.ElementType;
  };
};

export const Category: React.FC<Props> = React.memo(
  ({ nodes: { Title, Description } }) => {
    return (
      <div className="relative h-auto px-2 py-2">
        {/* Title, Description */}
        <div className="">
          {/* Title */}
          <div className="relative z-[20] mt-2 w-fit min-w-[15%] max-w-[100%] rounded-t-lg font-custom-serif text-5xl text-primary-900 dark:text-primary-100">
            <Title />
          </div>
          {/* Description */}
          <div className="relative z-[20] w-[80%] min-w-[15%] text-balance rounded-t-lg font-custom-sans text-base text-primary-800/80 dark:text-primary-200/80">
            <Description />
          </div>
        </div>
      </div>
    );
  },
);
