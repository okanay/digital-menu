import React from "react";
import { GripVertical } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const DragButton: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className="relative z-40 flex size-8 items-center justify-center rounded-lg border border-corner/20 bg-fill/40 p-1 transition-all duration-300 hover:bg-fill"
    >
      <GripVertical className="size-5 cursor-pointer text-font opacity-40 transition-all duration-300 group-hover/editor:opacity-100" />
    </div>
  );
};
