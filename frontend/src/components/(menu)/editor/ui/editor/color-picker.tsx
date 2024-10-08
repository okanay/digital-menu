import { ModalExplanation } from "@/components/ui/modal-explanation";
import useClickOutside from "@/hooks/use-click-outside";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useMenuEditor } from "../../use-menu-editor";

export const MenuColorPicker = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { colors, menu } = useMenuEditor();

  const handleClose = useCallback(() => setOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(handleClose, open);

  const [selectedColor, setSelectedColor] = useState({
    light: menu.color.colors.light,
    dark: menu.color.colors.dark,
  });

  const updateColors = (type: "light" | "dark", value: string) => {
    if (!menu.color.isActive) return;

    setSelectedColor((prev) => ({ ...prev, [type]: value }));
    colors.setCustomColors({
      ...selectedColor,
      [type]: value,
    });

    if (type === "light" && theme === "dark") {
      setTheme("light");
    } else if (type === "dark" && theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <div ref={ref} className="relative inline-block">
      <div className="group">
        <ModalExplanation>Color Picker</ModalExplanation>
        <button
          className="inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 hover:opacity-75 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
          onClick={() => setOpen(!open)}
        >
          <Palette className="size-5 text-black dark:text-white" />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 z-[110] mt-1.5 w-32 origin-top-right">
          <div className="flex flex-col items-start rounded border border-corner/10 bg-fill text-sm">
            <ColorPickerItem
              label="Light"
              color={selectedColor.light}
              onChange={(value) => updateColors("light", value)}
              disabled={!menu.color.isActive}
            />
            <ColorPickerItem
              label="Dark"
              color={selectedColor.dark}
              onChange={(value) => updateColors("dark", value)}
              disabled={!menu.color.isActive}
            />
            <ToggleButton
              isActive={menu.color.isActive}
              onChange={() => colors.setActive(!menu.color.isActive)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

const ColorPickerItem = ({
  label,
  color,
  onChange,
  disabled,
}: ColorPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative flex w-full items-center justify-between gap-2 px-2 py-1">
      <span className="text-xs">{label}</span>
      <input
        ref={inputRef}
        type="color"
        id={`${label.toLowerCase()}-color`}
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="pointer-events-none absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
      />
      <button
        disabled={disabled}
        style={{ backgroundColor: color }}
        className={twMerge(
          "inline-flex h-8 w-12 items-center justify-center rounded-lg border border-corner/10 bg-fill text-xs transition-all duration-300 active:scale-95",
          disabled && "cursor-not-allowed opacity-50",
        )}
        onClick={() => {
          if (disabled) return;
          inputRef.current?.click();
        }}
      />
    </div>
  );
};

interface ToggleButtonProps {
  isActive: boolean;
  onChange: () => void;
}

const ToggleButton = ({ isActive, onChange }: ToggleButtonProps) => (
  <div className="flex w-full items-center justify-between gap-2 px-2 py-1">
    <button
      className={`inline-flex h-8 w-full items-center justify-center rounded-lg border border-corner/10 bg-fill text-xs transition-all duration-300 hover:opacity-75 active:scale-95 ${
        isActive ? "bg-primary" : ""
      }`}
      onClick={onChange}
    >
      {isActive ? "ON" : "OFF"}
    </button>
  </div>
);
