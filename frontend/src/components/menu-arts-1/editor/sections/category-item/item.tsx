import { Reorder, useDragControls } from "framer-motion";
import { CategoryItem } from ".";
import { CategoryItemDeleteButton } from "./options/delete-button";
import { CategoryItemDesignChange } from "./options/design-change";
import { AllergensOptions } from "./options/allergens-options";
import { DiscountOptions } from "./options/discount-options";
import { DragButton } from "../../options/drag-button";
import { CategoryCosmeticDisplay } from "@/components/menu-arts-1/display/sections/cosmetic";

type Props = {
  category: MenuCategory;
  item: CategoryItem;
};

export const CategoryItemReOrderItem: React.FC<Props> = ({
  category,
  item,
}) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      drag
      dragListener={false}
      dragControls={controls}
      value={item}
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      {item.type === "product" && (
        <div className="relative">
          <CategoryItem
            category={category}
            item={item}
            product={item.data as CategoryProduct}
          />
          <div className="pointer-events-none absolute right-0 top-0 flex h-full w-full items-start justify-end gap-4 pr-2 pt-2">
            <div className="pointer-events-auto relative order-2 flex select-none flex-row items-center justify-end gap-3">
              <DiscountOptions category={category} item={item} />
              <AllergensOptions category={category} item={item} />
              <CategoryItemDesignChange category={category} item={item} />
              <DragButton onPointerDown={(event) => controls.start(event)} />
              <CategoryItemDeleteButton
                categoryId={category.id}
                itemId={item.id}
              />
            </div>
          </div>
        </div>
      )}

      {item.type === "cosmetics" && (
        <div className="relative h-3">
          <CategoryCosmeticDisplay item={item} />
          <div className="pointer-events-none absolute -top-5 right-0 flex w-full items-start justify-end gap-4 pr-2 pt-2">
            <div className="pointer-events-auto relative order-2 flex scale-75 select-none flex-row items-center justify-center gap-3">
              <CategoryItemDesignChange category={category} item={item} />
              <DragButton onPointerDown={(event) => controls.start(event)} />
              <CategoryItemDeleteButton
                categoryId={category.id}
                itemId={item.id}
              />
            </div>
          </div>
        </div>
      )}
    </Reorder.Item>
  );
};
