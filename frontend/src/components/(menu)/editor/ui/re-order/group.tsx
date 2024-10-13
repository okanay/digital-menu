import { AnimateChangeInHeight } from "@/components/ui/animate-change-in-height";
import { AnimatePresence, Reorder } from "framer-motion";
import { CategoryReOrderItem } from "./category-item";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onReorder: (list: any[]) => void;
  values: any[];
}

export const CategoryReOrderGroup: React.FC<Props> = ({
  onReorder,
  values,
}) => {
  return (
    <AnimateChangeInHeight>
      <Reorder.Group
        layout
        as={"div"}
        axis="y"
        dragDirectionLock={true}
        onReorder={onReorder}
        values={values}
        className="flex flex-col gap-2"
      >
        <AnimatePresence initial={false}>
          {values.map((value) => (
            <CategoryReOrderItem category={value} key={value.id} />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </AnimateChangeInHeight>
  );
};
