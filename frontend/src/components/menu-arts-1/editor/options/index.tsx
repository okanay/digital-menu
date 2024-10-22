import { ThemeSwitcher } from "@/components/theme-switcher";
import { MenuEditorAddCategory } from "./add-category";
import { MenuColorPicker } from "./color-picker";
import { MenuCurrency } from "./currency";
import { MenuFont } from "./font";
import { MenuEditorImageGallery } from "./image-gallery";
import { MenuLanguage } from "./language";
import { MenuEditorPreview } from "./preview";
import { MenuEditorRedo } from "./redo";
import { MenuEditorSave } from "./save";
import { MenuEditorUndo } from "./undo";

export const MenuEditorOptions: React.FC = () => {
  return (
    <div className="mx-auto my-8 flex flex-wrap items-start justify-end gap-2 px-2">
      <MenuEditorAddCategory />
      <MenuEditorImageGallery />
      <MenuLanguage />
      <MenuCurrency />
      <MenuColorPicker />
      <MenuFont />
      <MenuEditorSave />
      <MenuEditorPreview />
      <ThemeSwitcher />
      <MenuEditorUndo />
      <MenuEditorRedo />
    </div>
  );
};
