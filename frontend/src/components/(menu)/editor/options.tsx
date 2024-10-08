import { MenuEditorAddCategory } from "./ui/editor/add-category";
import { MenuColorPicker } from "./ui/editor/color-picker";
import { MenuCurrency } from "./ui/editor/currency";
import { MenuFont } from "./ui/editor/font";
import { MenuEditorImageGallery } from "./ui/editor/image-gallery";
import { MenuLanguage } from "./ui/editor/language";
import { MenuEditorRedo } from "./ui/editor/redo";
import { MenuEditorUndo } from "./ui/editor/undo";

export const MenuEditorOptions: React.FC = () => {
  return (
    <div className="mx-auto my-8 flex max-w-xl items-start justify-end gap-2 px-2">
      <MenuEditorAddCategory />
      <MenuEditorImageGallery />
      <MenuLanguage />
      <MenuCurrency />
      <MenuColorPicker />
      <MenuFont />
      <MenuEditorUndo />
      <MenuEditorRedo />
    </div>
  );
};
