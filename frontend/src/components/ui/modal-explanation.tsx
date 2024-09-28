import { PropsWithChildren } from "react";

export const ModalExplanation: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="flex items-center justify-center">
      <span className="border-corner/10 bg-fill absolute -top-7 text-nowrap rounded border px-2.5 py-0.5 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-cold-950">
        {props.children}
      </span>
    </div>
  );
};
