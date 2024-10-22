import { ModalExplanation } from "@/components/ui/modal-explanation";
import { Undo2 } from "lucide-react";
import { useShortcutEffect } from "@/hooks/use-shortcut-effect";
import { useMenuEditor } from "../../hooks/use-menu-editor";

export const MenuEditorUndo: React.FC = () => {
  //prettier-ignore
  const {undoRedo: { undo, canUndo }} = useMenuEditor();
  const handleUndo = () => {
    undo();
  };

  const { isEffectActive, triggerAction } = useShortcutEffect(
    handleUndo,
    1000,
    "z",
  );

  return (
    <div className="relative inline-block">
      <div className="group">
        <ModalExplanation>Undo Changes</ModalExplanation>
        <button
          disabled={!canUndo}
          onClick={triggerAction}
          className="group inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 active:scale-95 disabled:cursor-not-allowed"
        >
          <Undo2
            className={`size-5 text-black transition-all duration-300 dark:text-white ${isEffectActive ? "scale-90 opacity-50" : ""} group-disabled:text-gray-300 dark:group-disabled:text-gray-600`}
          />
        </button>
      </div>
    </div>
  );
};
