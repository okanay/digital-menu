import { PropsWithChildren } from "react";

export const ModalExplanation: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="pointer-events-none flex items-center justify-center">
      <span className="absolute -top-7 text-nowrap rounded border border-corner/10 bg-fill px-2.5 py-0.5 font-sans text-xs font-normal text-font-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {props.children}
      </span>
    </div>
  );
};
