import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

interface Props extends React.ComponentProps<"label"> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, Props>(
  ({ children, className, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={twMerge(
          "relative block w-fit text-sm font-medium text-font",
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="absolute -right-2.5 -top-1 text-xl text-primary-500/80">
            *
          </span>
        )}
      </label>
    );
  },
);
