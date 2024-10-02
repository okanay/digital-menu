import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentPropsWithoutRef<"input"> {}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ children, id, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={twMerge(
          "w-full rounded-none border-b border-corner/20 bg-white/0 px-2 py-3 text-sm outline-none focus:border-primary-500 focus:outline-none dark:bg-black/0",
          className,
        )}
      />
    );
  },
);
