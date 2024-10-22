import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<"input"> {
  error?: boolean;
  helperText?: string;
}

export const Input = ({
  className,
  error,
  helperText,
  ref,
  ...props
}: Props) => {
  return (
    <div className="relative w-full">
      <input
        ref={ref}
        className={twMerge(
          "h-10 w-full rounded border border-corner/10 bg-fill px-3 text-sm text-font placeholder:text-font-secondary",
          "transition-colors duration-200 ease-in-out",
          "focus:border-primary-500/80 focus:outline-none focus:ring-0",
          "disabled:cursor-not-allowed disabled:opacity-75",
          error && "border-rose-500/80",
          className,
        )}
        {...props}
      />
      {helperText && (
        <p
          className={twMerge(
            "mt-1 text-sm",
            error ? "text-red-500" : "text-font-secondary",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
