import { twMerge } from "tailwind-merge";
import { RefreshCw } from "lucide-react";

interface Props extends React.ComponentProps<"button"> {
  icon?: React.ReactNode;
}

export const InputEventWrapper = ({
  children,
  className,
  icon,
  ref,
  ...props
}: Props) => {
  return (
    <div className="flex h-fit w-full items-center gap-2">
      {children}
      <button
        {...props}
        ref={ref}
        type="button"
        className={twMerge(
          "h-10 w-8 rounded border border-corner/10 bg-primary-500/80 px-2 transition-all duration-300 hover:opacity-75 active:scale-95 disabled:opacity-75",
        )}
      >
        {icon ? icon : <RefreshCw className="size-full text-white" />}
      </button>
    </div>
  );
};
