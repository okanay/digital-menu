import { AlertCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
  variant?: "default" | "subtle";
}

export const ErrorMessage = ({
  children,
  className,
  icon = true,
  variant = "default",
}: ErrorMessageProps) => {
  return (
    <div
      role="alert"
      className={twMerge(
        "mt-2 animate-slideIn",
        variant === "default" ? "" : "",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <AlertCircle
            className="size-4 flex-shrink-0 text-rose-500"
            aria-hidden="true"
          />
        )}
        <p
          className={twMerge(
            "text-sm font-medium text-rose-500",
            variant === "subtle" && "text-rose-400",
          )}
        >
          {children}
        </p>
      </div>
    </div>
  );
};
