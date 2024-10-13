import { ModalExplanation } from "@/components/ui/modal-explanation";
import { Save } from "lucide-react";
import { useMenuEditor } from "../../use-menu-editor";
import { useShortcutEffect } from "@/hooks/use-shortcut-effect";
import { useEffect } from "react";
import { useMenu } from "@/components/(dashboard)/menus/[id]/use-menu";

export const MenuEditorSave: React.FC = () => {
  const { save, setStatus } = useMenuEditor();
  const { saveJSON, menu: menuData } = useMenu();

  const handleSave = () => {
    if (menuData) {
      const data = save();
      saveJSON(JSON.stringify(data))
        .then(() => {
          setStatus("success");
        })
        .catch(() => {
          setStatus("error");
        });
    } else {
      setStatus("success");
    }
  };

  const { isEffectActive, triggerAction } = useShortcutEffect(
    handleSave,
    1000,
    "s",
  );

  useEffect(() => {
    const interval = setInterval(() => {
      handleSave();
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

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
