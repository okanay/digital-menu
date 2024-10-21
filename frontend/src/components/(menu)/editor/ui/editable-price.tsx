import useClickOutside from "@/hooks/use-click-outside";
import { useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { useMenuEditor } from "../use-menu-editor";
import { ContentEditInput, ContentDisplay } from "./content-edit-input";

interface Props extends React.ComponentProps<"div"> {
  category: MenuCategory;
  item: CategoryItem;
  initial: string;
}

// prettier-ignore
export const EditablePrice: React.FC<Props> = ({category, item, initial, ...props}) => {
  const editor = useMenuEditor();

  const [text, setText] = useState(initial);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => handleOnBlur(), isEditing);

  const handleUpdate = useCallback(() => {
    const sanitizedText = text.replace(/[^0-9.,]/g, "");
    const normalizedText = sanitizedText.replace(",", ".");
    const parsedValue = parseFloat(normalizedText);
    const value = isNaN(parsedValue) ? 0 : parsedValue;

    editor.category.item.updateItem(category.id, {
      ...item,
      price: {
        ...item.price,
        text: sanitizedText,
        value: value,
      },
    });
  }, [editor, category.id, item, text]);

  const handleOnBlur = useCallback(() => {
    handleUpdate();
    setIsEditing(false);
  }, [handleUpdate]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/[^0-9.,]/g, "");
    setText(sanitizedInput);
  }, []);

  const handleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

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
