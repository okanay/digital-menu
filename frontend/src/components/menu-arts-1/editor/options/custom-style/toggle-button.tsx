import { twMerge } from "tailwind-merge";

interface Props {
  isActive: boolean;
  onToggle: () => void;
  toggleStates: string[];
  labelText?: string;
  disabled?: boolean;
}

export const ToggleButton = ({
  isActive,
  onToggle,
  labelText,
  toggleStates,
  disabled,
}: Props) => {
  const displayText = isActive ? toggleStates[0] : toggleStates[1];

  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-font">{labelText}</label>
      <button
        disabled={disabled}
        className={twMerge(
          `h-8 w-full rounded-lg border border-corner/10 text-xs transition-all duration-300 hover:opacity-75 active:scale-95`,
          isActive
            ? "bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-50"
            : "bg-gray-400 text-gray-50 dark:bg-gray-600 dark:text-gray-50",
          disabled ? "cursor-not-allowed opacity-75" : "",
        )}
        onClick={onToggle}
      >
        {displayText}
      </button>
    </div>
  );
};
