import Image, { type ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

export const ImageTW: React.FC<ImageProps> = ({ className, ...props }) => {
  return (
    <Image
      {...props}
      className={twMerge("h-auto", className)}
      width="0"
      height="0"
      sizes="100vw"
      priority
    />
  );
};
