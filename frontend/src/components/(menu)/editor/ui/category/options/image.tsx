import { useDialog } from "@/components/(menu)/dialogues/use-dialogu";
import { useImages } from "@/hooks/use-images";
import { Image as ImageIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useMenuEditor } from "../../../use-menu-editor";

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
        className={twMerge(
          "relative h-full w-full overflow-hidden bg-fill",
          imageBorderRadius,
        )}
      >
        {children}
        <div
          onMouseDown={() => handleImageClick()}
          className="group absolute inset-0 z-30 flex h-full w-full cursor-pointer items-center justify-center bg-fill/0 hover:bg-fill/20"
        >
          <ImageIcon className="size-9 rounded border border-corner/20 bg-fill/50 p-1 text-font/40 transition-colors duration-300 group-hover:text-font" />
        </div>
      </div>
    );
  },
);
