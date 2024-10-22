import { twMerge } from "tailwind-merge";

// ContentEditInput.tsx
interface ContentEditInputProps {
  text: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  className?: string;
}

export const ContentEditInput = ({
  text,
  onChange,
  onBlur,
  className,
}: ContentEditInputProps) => (
  <div className="flex flex-col">
    <input
      type="text"
      value={text}
      onChange={onChange}
      onBlur={onBlur}
      className={twMerge(
        "bg-transparent px-4 py-2 focus:outline-none",
        className,
      )}
      autoFocus
    />
  </div>
);

// ContentDisplay.tsx
interface ContentDisplayProps {
  text: string | number;
  onClick: () => void;
  className?: string;
}

export const ContentDisplay = ({
  text,
  onClick,
  className,
}: ContentDisplayProps) => (
  <h2
    onClick={onClick}
    className={twMerge(
      "cursor-pointer break-words rounded border border-corner/0 hover:border-corner/10",
      className,
    )}
  >
    {text}
  </h2>
);
