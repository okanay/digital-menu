import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

interface Props extends React.ComponentProps<"form"> {
  submit?: () => void;
}

export const Form = forwardRef<HTMLFormElement, Props>(
  ({ children, className, submit, ...props }, ref) => {
    return (
      <form
        ref={ref}
        {...props}
        className={twMerge("mt-4 flex flex-col gap-2", className)}
        onSubmit={async (e) => {
          e.preventDefault();
          submit?.();
        }}
      >
        {children}
      </form>
    );
  },
);
