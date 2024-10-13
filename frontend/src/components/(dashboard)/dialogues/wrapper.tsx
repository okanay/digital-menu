import React from "react";
import { DialogCloseButton } from "./dialog-close-button";
import useClickOutside from "@/hooks/use-click-outside";
import { useDialog } from "@/providers/dialogue/use-dialogu";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export const DialogWrapper = ({ children, title }: Props) => {
  const { setDialog, dialog } = useDialog();
  const ref = useClickOutside<HTMLDivElement>(
    () => setDialog("idle"),
    dialog !== "idle",
  );

  return (
    <div className="fixed inset-0 z-[999] bg-black/10 backdrop-blur-sm transition-all">
      <div className="flex min-h-screen items-center justify-center">
        <div
          ref={ref}
          className="relative w-full max-w-md transform overflow-hidden rounded border-y border-corner/20 bg-fill p-6 transition-all duration-300 sm:border-x sm:shadow-sm"
        >
          <DialogCloseButton />
          {/* Dialog Header */}
          {title && (
            <div>
              {title && (
                <h2 className="font-custom-serif text-lg leading-7 text-font">
                  {title}
                </h2>
              )}
            </div>
          )}

          {/* Dialog Content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
