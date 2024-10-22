import useClickOutside from "@/hooks/use-click-outside";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ContentEditInput, ContentDisplay } from "./content-edit-input";
import { useMenuEditor } from "@/components/menu-arts-1/hooks/use-menu-editor";

interface Props extends React.ComponentProps<"div"> {
  category: MenuCategory;
  item: CategoryItem;
  initial: string;
  product: CategoryProduct;
}

// prettier-ignore
export const EditablePrice: React.FC<Props> = ({category, item, initial,product, ...props}) => {
  const editor = useMenuEditor();

  const [text, setText] = useState(initial);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    const sanitizedText = text.replace(/[^0-9.,]/g, "");
    const normalizedText = sanitizedText.replace(",", ".");
    const parsedValue = parseFloat(normalizedText);
    const value = isNaN(parsedValue) ? 0 : parsedValue;

    const data : CategoryProduct ={
      ...product,
      price: {
        ...product.price,
        text: sanitizedText,
        value: value,
      },
    }

    editor.category.item.updateItem(category.id, {
      ...item,
      data : {...data}
    });
  };

  const handleOnBlur = () => {
    handleUpdate();
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^0-9.,]/g, "");
    setText(sanitizedInput);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const ref = useClickOutside<HTMLDivElement>(() => handleOnBlur(), isEditing);

  return (
    <div
      {...props}
      ref={ref}
      className={twMerge(
        "relative w-fit overflow-hidden rounded border border-corner/0 bg-primary-950/0 transition-colors duration-300 hover:text-primary-50 hover:bg-primary-950",
        isEditing && "border-corner/20 bg-primary-950 duration-500 hover:bg-primary-950 text-primary-50",
        text.length > 0 ? "" : "h-[40px]",
      )}
    >
      {isEditing ? (
        <div>
          <ContentEditInput
            text={text}
            onChange={handleChange}
            onBlur={handleOnBlur}
            className="h-full w-fit max-w-[120px]"
          />
        </div>
      ) : (
        <ContentDisplay
          text={text}
          onClick={handleClick}
          className={twMerge(
            text.length > 0 ? "" : "h-full min-w-[40px]",
          )}
        />
      )}
    </div>
  );
};
