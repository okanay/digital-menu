import { ModalExplanation } from "@/components/ui/modal-explanation";
import { allergensList } from "../../helper/allergens";
import { twMerge } from "tailwind-merge";
import { useMemo } from "react";

type Props = {
  allergens: number[];
  className?: string;
};

export const AllergensDisplay = ({ allergens, className }: Props) => {
  const allergenElements = useMemo(() => {
    return allergens.map((a, i) => {
      const allergen = allergensList.find((al) => al.id === a);
      return allergen ? (
        <div
          key={i}
          className="group pointer-events-auto relative z-[40] inline-flex size-6 items-center justify-center rounded-full border border-primary-200 bg-primary-100 text-xs dark:border-primary-800 dark:bg-primary-900"
        >
          <ModalExplanation>{allergen.name}</ModalExplanation>
          {allergen.icon}
        </div>
      ) : null;
    });
  }, [allergens]);

  return (
    <div
      className={twMerge(
        "flex max-w-[60%] flex-wrap items-center gap-x-2",
        className,
      )}
    >
      {allergenElements}
    </div>
  );
};
