import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

interface Props extends React.ComponentProps<"div"> {}

export const LabelWrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={twMerge("flex flex-col gap-1.5", className)}
      >
        {children}
      </div>
    );
  },
);
