import useClickOutside from "@/hooks/use-click-outside";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import { GetAllFontsName } from "@/utils/get-all-fonts-name";
import { Palette as Icon } from "lucide-react";
import { ColorPickerItem } from "../color-picker";
import { Select } from "./select-input";
import { ToggleButton } from "./toggle-button";
import { STYLE_DEFAULTS } from "./styles";

type StyleEditorProps = {
  style: Style;
  updateFunction: (style: Style, applyToAll: boolean) => void;
};

export const CustomStyle = ({ updateFunction, style }: StyleEditorProps) => {
  // State tanımlamaları
  const [isActive, setIsActive] = useState(style.isActive);
  const [font, setFont] = useState<Font>(style.font);
  const [textColor, setTextColor] = useState<TextColor>(style.textColor);
  const [attr, setAttr] = useState<StyleAttr>(style.attr);

  // Modal Open State
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    handleStyleChange();
    setIsOpen(false);
  }, isOpen);

  // Style değişikliklerini parent componente iletme
  const handleStyleChange = () => {
    updateFunction(
      {
        isActive: isActive,
        attr: attr,
        font: font,
        textColor: textColor,
      },
      false,
    );
  };

  // Renk değişikliği handler'ı
  const { setTheme, theme } = useTheme();
  const handleColorChange = (color: string, mode: "light" | "dark") => {
    const newTextColor = {
      ...textColor,
      [mode]: color,
    };
    setTextColor(newTextColor);

    // Tema değişikliği
    const shouldSwitchTheme =
      (mode === "light" && theme === "dark") ||
      (mode === "dark" && theme === "light");
    if (shouldSwitchTheme) {
      setTheme(mode);
    }
  };

  // Style attribute değişiklik handler'ı
  const handleStyleAttributeChange = (
    attributeName: keyof StyleAttr,
    value: string,
  ) => {
    setAttr((prevStyle) => ({
      ...prevStyle,
      [attributeName]: value,
    }));
  };

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isProcessing) return;

    setIsProcessing(true);

    const timeout = setTimeout(() => {
      handleStyleChange();
      setIsProcessing(false);
    }, 100);

    return () => {
      clearTimeout(timeout);
      setIsProcessing(false);
    };
  }, [isActive, font, textColor, attr]);

  return (
    <div
      ref={ref}
      className="group absolute -left-7 top-0 z-[40] inline-block flex-1 font-sans text-sm font-normal text-font"
    >
      {/* Style Editor Trigger Button */}

      <ModalExplanation>Custom Style</ModalExplanation>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group/style flex size-6 items-center justify-center rounded-lg border border-corner/20 bg-fill px-1"
      >
        <Icon className="size-full rounded text-font/40 transition-colors duration-300 group-hover/style:text-font" />
      </button>

      {/* Style Editor Popup */}
      {isOpen && (
        <div className="absolute right-8 mt-1.5 w-40">
          <div className="flex w-full flex-col items-start gap-2 rounded border border-corner/10 bg-fill px-2 pb-2 text-sm">
            {/* Toggle Active */}
            <ToggleButton
              isActive={isActive}
              onToggle={() => {
                setIsActive((prev) => !prev);
              }}
              toggleStates={["Disable", "Activate"]}
              labelText=""
            />
            {/* Color Pickers */}
            <label className="text-xs text-font">Text Color</label>
            <div className="-mt-1 flex w-full items-center justify-center -space-x-2">
              <ColorPickerItem
                label="Light"
                color={textColor.light}
                disabled={!isActive}
                className="flex flex-col gap-1"
                onChange={(value) => handleColorChange(value, "light")}
              />
              <ColorPickerItem
                label="Dark"
                color={textColor.dark}
                disabled={!isActive}
                className="flex flex-col gap-1"
                onChange={(value) => handleColorChange(value, "dark")}
              />
            </div>
            {/* Font Style Controls */}
            <Select
              label="Font Size"
              options={STYLE_DEFAULTS.FONT_SIZES}
              value={attr.fontSize}
              disabled={!isActive}
              onChange={(e) =>
                handleStyleAttributeChange("fontSize", e.target.value)
              }
            />
            <Select
              label="Font Weight"
              options={STYLE_DEFAULTS.FONT_WEIGHTS}
              value={attr.fontWeight}
              disabled={!isActive}
              onChange={(e) =>
                handleStyleAttributeChange("fontWeight", e.target.value)
              }
            />
            <Select
              label="Letter Spacing"
              options={STYLE_DEFAULTS.LETTER_SPACINGS}
              value={attr.letterSpacing}
              disabled={!isActive}
              onChange={(e) =>
                handleStyleAttributeChange("letterSpacing", e.target.value)
              }
            />
            <Select
              label="Line Heights"
              options={STYLE_DEFAULTS.LINE_HEIGHTS}
              value={attr.lineHeight}
              disabled={!isActive}
              onChange={(e) =>
                handleStyleAttributeChange("lineHeight", e.target.value)
              }
            />
            <Select
              label="Opacity"
              options={STYLE_DEFAULTS.OPACITY_VALUES}
              value={attr.opacity}
              disabled={!isActive}
              onChange={(e) =>
                handleStyleAttributeChange("opacity", e.target.value)
              }
            />
            <Select
              label="Font"
              options={GetAllFontsName()}
              value={font}
              disabled={!isActive}
              onChange={(e) => setFont(e.target.value as Font)}
            />

            <Select
              label="Display"
              options={STYLE_DEFAULTS.HIDDEN_VALUES}
              value={attr.hidden}
              disabled={!isActive}
              onChange={(e) =>
                handleStyleAttributeChange("hidden", e.target.value)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
