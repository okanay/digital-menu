import React from "react";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import { Image as ImageIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useImages } from "@/hooks/use-images";
import { useMenuEditor } from "../../../use-menu-editor";
import { useDialog } from "@/providers/dialogue/use-dialogu";

type Props = {
  children?: React.ReactNode;
  category: MenuCategory;
  className?: string;
  onClick?: () => void;
  imageBorderRadius?: string;
};

export const CategoryImageEditWrapper: React.FC<Props> = React.memo(
  ({ children, imageBorderRadius, category }) => {
    const editor = useMenuEditor();
    const { updateCategory } = editor.category;

    const { setGalleryImageClickHandler } = useImages();
    const { setDialog } = useDialog();

    const handleUpdate = (image: ImageProps) => {
      updateCategory({
        ...category,
        image: {
          ...category.image,
          url: image.url,
        },
      });

      setDialog("idle");
    };

    const handleImageClick = () => {
      setDialog("gallery");
      setGalleryImageClickHandler(handleUpdate);
    };

    return (
      <div
        className={twMerge("group h-full w-full bg-fill", imageBorderRadius)}
      >
        {children}
        <div
          onMouseDown={() => handleImageClick()}
          className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center"
        >
          <div className="relative z-[35] items-center justify-center">
            <ModalExplanation>Change Image</ModalExplanation>
            <ImageIcon className="size-9 rounded border border-corner/20 bg-fill/60 p-1 text-font/40 transition-colors duration-300 group-hover:text-font" />
          </div>
        </div>
      </div>
    );
  },
);
