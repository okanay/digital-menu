import React from "react";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

interface Props extends React.ComponentProps<"button"> {
  loading?: boolean;
  variant?: "primary";
}

// prettier-ignore
export const SubmitButton = React.forwardRef<HTMLButtonElement, Props>(({ className, children, loading, variant = "primary", disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-primary-500/80 text-white hover:opacity-75 active:scale-95 ",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={twMerge(
          baseStyles,
          variants[variant],
          "mt-4 h-[44px] w-full focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 disabled:cursor-not-allowed",
          loading && "relative text-transparent",
          className,
        )}
        {...props}
      >
        {children}
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="size-5 animate-spin text-fill" />
          </div>
        )}
      </button>
    );
  },
);
