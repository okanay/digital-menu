import { ModalExplanation } from "@/components/ui/modal-explanation";
import { Undo2 } from "lucide-react";
import { useMenuEditor } from "../../use-menu-editor";
import { useCallback, useEffect } from "react";

export const MenuEditorUndo: React.FC = () => {
  const {
    undoRedo: { undo, canUndo },
  } = useMenuEditor();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Windows: Ctrl+Z, Mac: Command+Z
      // prettier-ignore
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z" && !event.shiftKey) {
        if (canUndo) {
          event.preventDefault();
          undo();
        }
      }
    },
    [canUndo, undo],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative inline-block">
      <div className="group">
        <ModalExplanation>Undo Changes</ModalExplanation>
        <button
          disabled={!canUndo}
          onClick={undo}
          className="group inline-flex h-[2.5rem] items-center justify-center rounded-lg border border-corner/10 bg-fill px-4 py-2 text-sm transition-all duration-300 active:scale-95 disabled:cursor-not-allowed"
        >
          <Undo2 className="size-5 text-black group-disabled:text-gray-300 dark:text-white dark:group-disabled:text-gray-600" />
        </button>
      </div>
    </div>
  );
};
