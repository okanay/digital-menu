import React from "react";
import { GripVertical } from "lucide-react";
import { ModalExplanation } from "@/components/ui/modal-explanation";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const DragButton: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div {...props} className="group relative inline-block flex-1">
      <ModalExplanation>Drag</ModalExplanation>
      <div className="group/drag relative flex size-7 items-center justify-center rounded-lg border border-corner/20 bg-fill p-1 transition-all duration-300">
        <GripVertical className="size-5 cursor-pointer text-font opacity-40 transition-all duration-300 group-hover/drag:opacity-100" />
      </div>
    </div>
  );
};
