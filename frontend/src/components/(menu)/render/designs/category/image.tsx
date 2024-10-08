import Image from "next/image";

type Props = {
  category: MenuCategory;
  imageBorderRadius?: string;
};

export const CategoryImageDisplay = ({
  category,
  imageBorderRadius,
}: Props) => {
  return (
    <Image
      src={category.image.url}
      alt={category.image.description}
      className={imageBorderRadius || ""}
      fill
      sizes="50vw"
      priority
      style={{ objectFit: "cover" }}
    />
  );
};
