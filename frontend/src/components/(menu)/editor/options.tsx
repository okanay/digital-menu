import { MenuEditorAddCategory } from "./ui/options/add-category";
import { MenuColorPicker } from "./ui/options/color-picker";
import { MenuCurrency } from "./ui/options/currency";
import { MenuFont } from "./ui/options/font";
import { MenuEditorImageGallery } from "./ui/options/image-gallery";
import { MenuLanguage } from "./ui/options/language";
import { MenuEditorRedo } from "./ui/options/redo";
import { MenuEditorSave } from "./ui/options/save";
import { MenuEditorUndo } from "./ui/options/undo";

export const MenuEditorOptions: React.FC = () => {
  return (
    <div className="mx-auto my-8 flex max-w-xl items-start justify-end gap-2 px-2">
      <MenuEditorAddCategory />
      <MenuEditorImageGallery />
      <MenuLanguage />
      <MenuCurrency />
      <MenuColorPicker />
      <MenuFont />
      <MenuEditorSave />
      <MenuEditorUndo />
      <MenuEditorRedo />
    </div>
  );
};
