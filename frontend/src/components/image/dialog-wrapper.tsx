import useClickOutside from "@/hooks/use-click-outside";
import { twMerge } from "tailwind-merge";
import { XIcon } from "lucide-react";
import { useDialog } from "../(menu)/dialogues/use-dialogu";

type DialogProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  menu?: React.ReactNode;
};

export const DialogWrapper: React.FC<DialogProps> = ({
  children,
  className,
  title,
  menu,
}) => {
  const { setDialog } = useDialog();
  const ref = useClickOutside<HTMLDivElement>(() => setDialog("idle"));

  return (
    <div className="fixed left-0 top-0 z-40 h-screen min-h-[440px] w-full bg-fill/10 dark:bg-fill/10">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center">
        <div
          ref={ref}
          className={twMerge(
            "z-40 w-full max-w-xl rounded border border-corner/20 bg-zinc-50 pt-4 dark:border-corner/20 dark:bg-fill",
            className,
          )}
        >
          <div className="flex w-full items-center justify-between overflow-y-auto border-b border-corner/10 px-4 pb-4">
            <h1 className="text-2xl text-font">{title || "Dialog"}</h1>
            <div className="flex gap-2">
              {menu}
              <button
                className="flex size-[40px] items-center justify-center rounded-full bg-fill-primary transition-all hover:opacity-75 active:scale-95"
                onClick={() => setDialog("idle")}
              >
                <XIcon className="size-4 text-font" />
              </button>
            </div>
          </div>
          <div className="h-[400px] px-4 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
