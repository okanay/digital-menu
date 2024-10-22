import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";
import { allergensList } from "@/components/menu-arts-1/utils/allergens";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import useClickOutside from "@/hooks/use-click-outside";
import { useDialog } from "@/providers/dialogue/use-dialogu";
import { Nut } from "lucide-react";
import React, { useState } from "react";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
};

export const AllergensOptions: React.FC<Props> = ({ category, item }) => {
  const { setDialog } = useDialog();

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDialog("allergens-options", {
      category,
      item,
      dialogPosition: { x: event.clientX, y: event.clientY },
    });
  };

  return (
    <div className="group relative inline-block">
      <ModalExplanation>Allergens Options</ModalExplanation>
      <div className="flex items-center gap-2.5">
        <button
          onClick={handleOnClick}
          className="group/up relative flex size-6 items-center justify-center rounded-lg border border-corner/20 bg-fill p-0.5"
        >
          <Nut className="size-full text-font opacity-30 transition-all duration-300 group-hover/up:opacity-100" />
        </button>
      </div>
    </div>
  );
};

export const AllergensDialog = () => {
  const { value, dialog, closeDialog } = useDialog();

  const editor = useMenuEditor();

  const initial: number[] = value.item.data.allergens || [];
  const [selectedAllergens, setSelectedAllergens] = useState(initial);

  const toggleAllergen = (allergenId: number) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergenId)
        ? prev.filter((id) => id !== allergenId)
        : [...prev, allergenId],
    );
  };

  const handleSave = () => {
    const data: CategoryProduct = {
      ...value.item.data,
      allergens: selectedAllergens,
    };

    editor.category.item.updateItem(value.category.id, {
      ...value.item,
      data: { ...data },
    });
  };

  const ref = useClickOutside<HTMLDivElement>(() => {
    handleSave();
    closeDialog();
  }, dialog === "allergens-options");

  return (
    <div
      ref={ref}
      className="absolute z-[999] w-32 pb-8"
      style={{
        top: `${value.dialogPosition.y + 16}px`,
        left: `${Math.max(value.dialogPosition.x - 60, 0)}px`,
      }}
    >
      <div className="flex w-full flex-col gap-2 rounded border border-corner/10 bg-fill p-2 text-xs tracking-wide">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Allergens</h3>
        </div>
        <div className="flex w-full flex-col gap-2">
          {allergensList.map((allergen) => (
            <div
              key={allergen.id + allergen.name}
              className="flex w-full items-center justify-between"
            >
              <label
                htmlFor={allergen.name}
                className="flex cursor-pointer items-center space-x-2 text-nowrap"
              >
                {allergen.icon} {allergen.name}
              </label>
              <input
                id={allergen.name}
                type="checkbox"
                checked={selectedAllergens.includes(allergen.id)}
                onChange={() => toggleAllergen(allergen.id)}
                className="flex-0 size-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
