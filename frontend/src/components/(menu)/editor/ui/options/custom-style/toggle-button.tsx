import { twMerge } from "tailwind-merge";

interface Props {
  isActive: boolean;
  onToggle: () => void;
  toggleStates: string[];
  labelText?: string;
}

export const ToggleButton = ({
  isActive,
  onToggle,
  labelText,
  toggleStates,
}: Props) => {
  const displayText = isActive ? toggleStates[0] : toggleStates[1];

  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-xs text-font">{labelText}</label>
      <button
        className={twMerge(
          `h-8 w-full rounded-lg border border-corner/10 text-xs text-primary-50 transition-all duration-300 hover:opacity-75 active:scale-95`,
          isActive ? "bg-primary-500" : "bg-gray-500",
        )}
        onClick={onToggle}
      >
        {displayText}
      </button>
    </div>
  );
};
