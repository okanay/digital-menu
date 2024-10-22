import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type Props = {
  url: string;
  description: string;
  className?: string;
};

export const ImageDisplay: React.FC<Props> = ({
  url,
  description,
  className,
}) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <Image
      src={hasError ? "/images/placeholder.webp" : url}
      alt={description}
      className={twMerge("-z-10", className)}
      fill
      sizes="50vw"
      priority
      style={{ objectFit: "cover" }}
      onError={handleImageError}
    />
  );
};
