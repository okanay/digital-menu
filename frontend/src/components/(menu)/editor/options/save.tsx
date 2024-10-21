import { ModalExplanation } from "@/components/ui/modal-explanation";
import { Save } from "lucide-react";
import { useMenuEditor } from "../use-menu-editor";
import { useShortcutEffect } from "@/hooks/use-shortcut-effect";
import { useMenu } from "@/components/(dashboard)/menus/[id]/use-menu";

export const MenuEditorSave: React.FC = () => {
  const { menu } = useMenuEditor();
  const { status, updateMenu, menu: menuData } = useMenu();

  const handleSave = async () => {
    if (status.update === "updating") return;

    await updateMenu({
      uniqueId: menuData!.uniqueId,
      json: JSON.stringify(menu),
    });
  };

  const { isEffectActive, triggerAction } = useShortcutEffect(
    handleSave,
    100,
    "s",
  );

  return (
    <div className="relative inline-block">
      <div className="group">
        <ModalExplanation>Save Changes</ModalExplanation>
        <button
          onClick={triggerAction}
          className="group inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 active:scale-95 disabled:cursor-not-allowed"
        >
          <Save
            className={`size-5 text-black transition-all duration-300 dark:text-white ${isEffectActive ? "scale-90 opacity-50" : ""} group-disabled:text-gray-300 dark:group-disabled:text-gray-600`}
          />
        </button>
      </div>
    </div>
  );
};
