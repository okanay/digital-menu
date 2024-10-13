import { SelectableMono } from "@/assets/fonts/mono";
import { SelectableSans } from "@/assets/fonts/sans";
import { SelectableSerif } from "@/assets/fonts/serif";

export const GetAllFontsName = () => {
  const fonts = [
    ...SelectableMono(),
    ...SelectableSans(),
    ...SelectableSerif(),
  ];
  return [
    { value: "", label: "Default" },
    ...fonts.map((font) => ({ value: font, label: font })),
  ];
};
