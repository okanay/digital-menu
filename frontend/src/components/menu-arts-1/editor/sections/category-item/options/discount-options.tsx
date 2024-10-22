import React, { useState } from "react";
import { Percent } from "lucide-react";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import useClickOutside from "@/hooks/use-click-outside";
import { ToggleButton } from "../../../options/custom-style/toggle-button";
import { useDialog } from "@/providers/dialogue/use-dialogu";
import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
};

export const DiscountOptions: React.FC<Props> = ({ category, item }) => {
  const { setDialog } = useDialog();

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDialog("discount-options", {
      category,
      item,
      dialogPosition: { x: event.clientX, y: event.clientY },
    });
  };

  return (
    <div className="group relative">
      <ModalExplanation>Discount Options</ModalExplanation>
      <button
        onClick={handleOnClick}
        className="flex h-6 w-6 items-center justify-center rounded-lg border border-corner/20 bg-fill p-0.5"
      >
        <Percent className="h-full w-full text-font opacity-30 transition-all duration-300 group-hover:opacity-100" />
      </button>
    </div>
  );
};

export const DiscountDialog = () => {
  const { value, dialog, closeDialog } = useDialog();
  const editor = useMenuEditor();

  // value.item.data.price.discount?.isActive || false,
  const [isActive, setIsActive] = useState<boolean>(false);

  // value.item.data.price.discount?.percentage || 0,
  const [percentage, setPercentage] = useState<number>(0);

  const handleSave = () => {
    const data: CategoryProduct = {
      ...value.item.data,
      price: {
        ...value.item.data.price,
        discount: {
          isActive,
          percentage,
        },
      },
    };

    editor.category.item.updateItem(value.category.id, {
      ...value.item,
      data: { ...data },
    });
  };

  const ref = useClickOutside<HTMLDivElement>(() => {
    handleSave();
    closeDialog();
  }, dialog === "discount-options");

  return (
    <div
      ref={ref}
      className="absolute z-[999] w-32 pb-8"
      style={{
        top: `${value.dialogPosition.y + 16}px`,
        left: `${Math.max(value.dialogPosition.x - 60, 0)}px`,
      }}
    >
      <div className="absolute right-0 mt-1.5 w-24 origin-top-right">
        <div className="flex flex-col rounded border border-corner/10 bg-fill p-2 text-xs">
          <div className="flex w-full flex-col items-start justify-start">
            <label htmlFor="discount-value" className="mb-1 text-nowrap">
              Percentage
            </label>
            <input
              disabled={!isActive}
              id="discount-value"
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              className="mb-2 h-8 w-full cursor-pointer rounded-md border border-corner/10 bg-fill px-2 text-xs focus:outline-none disabled:cursor-not-allowed disabled:bg-fill-primary disabled:opacity-75"
              min="0"
              max="100"
            />
            <ToggleButton
              onToggle={() => setIsActive((prev) => !prev)}
              labelText="Discount"
              isActive={isActive}
              toggleStates={["On", "Off"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
