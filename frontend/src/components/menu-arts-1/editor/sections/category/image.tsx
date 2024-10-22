import React from "react";
import { ModalExplanation } from "@/components/ui/modal-explanation";
import { Image as ImageIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useImages } from "@/hooks/use-images";

import { useDialog } from "@/providers/dialogue/use-dialogu";
import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";

type Props = {
  category: MenuCategory;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

// prettier-ignore
export const ImageEdit: React.FC<Props> = ({ category, className, children}) => {
  const { setGalleryImageClickHandler } = useImages();
  const { setDialog } = useDialog();
  const editor = useMenuEditor();

  const handleUpdate = (image: ImageProps) => {
    editor.category.updateCategory({
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
    <div className={twMerge("group relative", className)}>
      {children}
      <div
        onMouseDown={() => handleImageClick()}
        className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center"
      >
        <div className="items-center justify-center">
          <ModalExplanation>Change Image</ModalExplanation>
          <ImageIcon className="size-9 rounded border border-corner/20 bg-fill/75 p-1 text-font/40 transition-colors duration-300 group-hover:text-font" />
        </div>
      </div>
    </div>
  );
};
