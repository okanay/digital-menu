import useClickOutside from "@/hooks/use-click-outside";
import { Type } from "lucide-react";
import { useCallback, useState } from "react";
import { useMenuEditor } from "../use-menu-editor";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import { SelectableMono } from "@/assets/fonts/mono";
import { SelectableSans } from "@/assets/fonts/sans";
import { SelectableSerif } from "@/assets/fonts/serif";
import { ToggleButton } from "./custom-style/toggle-button";

export const MenuFont = () => {
  const [open, setOpen] = useState(false);

  const { menu, font } = useMenuEditor();
  const { isActive } = menu.font;
  const { setActive, setMonoFont, setSansFont, setSerifFont } = font;
  const { serif, sans, mono } = menu.font.fonts;

  const handleClose = useCallback(() => setOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(handleClose, open);

  return (
    <div ref={ref} className="relative inline-block">
      <div className="group">
        <ModalExplanation>Font Settings</ModalExplanation>
        <button
          className="inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 hover:opacity-75 active:scale-95 disabled:cursor-not-allowed disabled:opacity-75"
          onClick={() => setOpen(!open)}
        >
          <Type className="size-5 text-black dark:text-white" />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 z-[110] mt-1.5 w-32 origin-top-right">
          <div className="flex w-full flex-col items-start gap-2 rounded border border-corner/10 bg-fill px-2 py-1 text-sm">
            {/* Serif Font Selection */}
            <div className="flex w-full flex-col">
              <label className="mb-1 text-xs font-medium">Serif</label>
              <Select
                fonts={SelectableSerif()}
                disabled={!isActive}
                onChange={(e) => setSerifFont(e.target.value as Serif)}
                defaultValue={serif.custom}
              />
            </div>

            {/* Sans Font Selection */}
            <div className="flex w-full flex-col">
              <label className="mb-1 text-xs font-medium">Sans</label>
              <Select
                fonts={SelectableSans()}
                disabled={!isActive}
                onChange={(e) => setSansFont(e.target.value as Sans)}
                defaultValue={sans.custom}
              />
            </div>

            {/* Mono Font Selection */}
            <div className="flex w-full flex-col">
              <label className="mb-1 text-xs font-medium">Mono</label>
              <Select
                fonts={SelectableMono()}
                disabled={!isActive}
                onChange={(e) => setMonoFont(e.target.value as Mono)}
                defaultValue={mono.custom}
              />
            </div>

            {/* Custom Font Toggle */}

            <div className="w-full pb-1">
              <ToggleButton
                isActive={menu.font.isActive}
                onToggle={() => setActive(!isActive)}
                toggleStates={["ON", "OFF"]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface SelectProps extends React.ComponentProps<"select"> {
  fonts: string[];
}

const Select: React.FC<SelectProps> = ({ fonts, ...props }) => {
  return (
    <select
      {...props}
      className="h-8 w-full cursor-pointer rounded-md border border-corner/10 bg-fill-primary px-2 text-xs focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
    >
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
};
