import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

interface Props extends React.ComponentProps<"select"> {
  error?: boolean;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const Select = ({
  className,
  error,
  helperText,
  options,
  ref,
  ...props
}: Props) => {
  return (
    <div className="relative w-full">
      <select
        {...props}
        ref={ref}
        className={twMerge(
          "h-10 w-full rounded border border-corner/10 bg-fill px-3 text-sm text-font placeholder:text-font-secondary",
          "transition-colors duration-200 ease-in-out",
          "focus:border-primary-500/80 focus:outline-none focus:ring-0",
          "disabled:cursor-not-allowed disabled:opacity-75",
          error && "border-rose-500/80",
          className,
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
