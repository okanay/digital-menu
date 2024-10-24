import { Palette as Icon } from "lucide-react";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import { useDialog } from "@/providers/dialogue/use-dialogu";
import { twMerge } from "tailwind-merge";
import { EmptyStyle } from "@/constants/menu-arts-1";
import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";

type StyleEditorProps = {
  updateFunction: (style: Style, applyToAll: boolean) => void;
  className?: string;
  style?: Style;
};

export const CustomStyle = ({
  updateFunction,
  className,
  style = EmptyStyle,
}: StyleEditorProps) => {
  const editor = useMenuEditor();
  const { setDialog } = useDialog();

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDialog("custom-style", {
      isActive: style.isActive,
      font: style.font,
      textColor: style.textColor,
      attr: style.attr,
      function: updateFunction,
      dialogPosition: { x: event.clientX, y: event.clientY },
    });
  };

  return (
    <div
      className={twMerge(
        "group absolute inline-block flex-1 font-sans text-sm font-normal text-font",
        className,
        editor.menu.language.current == "sa"
          ? "-right-6 -top-4"
          : "-left-6 -top-4",
      )}
    >
      <ModalExplanation>Custom Style</ModalExplanation>
      <button
        onClick={handleOnClick}
        className="group/style flex size-5 items-center justify-center rounded-lg border border-corner/20 bg-fill px-1 opacity-80"
      >
        <Icon className="size-full rounded text-font/40 transition-colors duration-300 group-hover/style:text-font" />
      </button>
    </div>
  );
};
