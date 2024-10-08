import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { ButtonSecondary } from "../ui/buttons";

type ImageGalleryErrorProps = {
  handleRefresh: () => void;
};

export const ImageGalleryError = ({
  handleRefresh,
}: ImageGalleryErrorProps) => {
  return (
    <div className="flex h-96 flex-col items-center justify-center space-y-4 text-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Failed to load images
      </p>
      <ButtonSecondary
        onClick={handleRefresh}
        className="flex items-center justify-center gap-2 rounded-full"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Retry</span>
      </ButtonSecondary>
    </div>
  );
};
