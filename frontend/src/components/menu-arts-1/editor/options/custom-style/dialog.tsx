import useClickOutside from "@/hooks/use-click-outside";
import { useDialog } from "@/providers/dialogue/use-dialogu";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ColorPickerItem } from "../color-picker";
import { Select } from "./select-input";
import { GetAllFontsName } from "@/utils/get-all-fonts-name";
import { ToggleButton } from "./toggle-button";
import { STYLE_DEFAULTS } from "./styles";

export const CustomStyleDialog = () => {
  const { value, dialog, closeDialog } = useDialog();
  const { theme, setTheme } = useTheme();

  const [isActive, setIsActive] = useState<boolean>(value.isActive);
  const [textColorIsActive, setTextColorIsActive] = useState<boolean>(
    value.textColor.isActive,
  );

  const [font, setFont] = useState<Font>(value.font);
  const [attr, setAttr] = useState<StyleAttr>(value.attr);
  const [selectedColor, setSelectedColor] = useState<TextColor>(
    value.textColor,
  );

  // // Style değişikliklerini parent componente iletme
  const handleStyleChange = () => {
    value.function(
      {
        isActive: isActive,
        attr: attr,
        font: font,
        textColor: {
          isActive: textColorIsActive,
          light: selectedColor.light,
          dark: selectedColor.dark,
        },
      },
      false,
    );
  };

  const updateColors = (type: "light" | "dark", value: string) => {
    if (isActive === false) return;

    setSelectedColor((prev) => ({ ...prev, [type]: value }));

    if (type === "light" && theme === "dark") {
      setTheme("light");
    } else if (type === "dark" && theme === "light") {
      setTheme("dark");
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

  // Modal Open State
  const ref = useClickOutside<HTMLDivElement>(() => {
    handleStyleChange();
    closeDialog();
  }, dialog === "custom-style");

  useEffect(() => {
    handleStyleChange();
  }, [font, attr, selectedColor, isActive]);

  return (
    <div
      ref={ref}
      className="absolute z-[999] mt-1 w-36 overflow-y-auto pb-8"
      style={{
        top: `${value.dialogPosition.y + 16}px`,
        left: `${Math.max(value.dialogPosition.x - 160, 0)}px`,
      }}
    >
      <div className="flex w-full flex-col items-start gap-2 rounded border border-corner/10 bg-fill px-2 pb-2 pt-2 text-xs">
        {/* Toggle Active */}
        <ToggleButton
          isActive={isActive}
          onToggle={() => {
            setIsActive((prev) => !prev);
          }}
          toggleStates={["Active", "Default"]}
          labelText=""
        />
        <ToggleButton
          isActive={textColorIsActive}
          onToggle={() => {
            setTextColorIsActive((prev) => !prev);
          }}
          toggleStates={["Custom", "Theme"]}
          labelText="Color Options"
          disabled={!isActive}
        />
        {textColorIsActive && (
          <div className="flex w-full items-center justify-center -space-x-2">
            <ColorPickerItem
              label="Light"
              color={selectedColor.light}
              disabled={!isActive}
              className="flex flex-col gap-1"
              onChange={(value) => updateColors("light", value)}
            />
            <ColorPickerItem
              label="Dark"
              color={selectedColor.dark}
              disabled={!isActive}
              className="flex flex-col gap-1"
              onChange={(value) => updateColors("dark", value)}
            />
          </div>
        )}
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
          label="Alignment"
          options={STYLE_DEFAULTS.TEXT_ALIGNMENTS}
          value={attr.align}
          disabled={!isActive}
          onChange={(e) => handleStyleAttributeChange("align", e.target.value)}
        />

        <Select
          label="Wrap"
          options={STYLE_DEFAULTS.TEXT_WRAPS}
          value={attr.wrap}
          disabled={!isActive}
          onChange={(e) => handleStyleAttributeChange("wrap", e.target.value)}
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
          onChange={(e) => handleStyleAttributeChange("hidden", e.target.value)}
        />
      </div>
    </div>
  );
};
