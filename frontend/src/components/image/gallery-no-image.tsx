import { ImageIcon } from "lucide-react";

export const NoImages = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center">
      <ImageIcon className="h-16 w-16 text-zinc-400" />
      <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
        No images found
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-500">
        Upload some images to see them here
      </p>
    </div>
  );
};
