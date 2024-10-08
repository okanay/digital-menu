import Image from "next/image";
import { XCircle } from "lucide-react";
import { NoImages } from "./gallery-no-image";
import { useImages } from "@/hooks/use-images";

type ImageGalleryProps = {
  images: ImageProps[];
  handleDelete: (id: string) => Promise<void>;
};

export const ImagesGallery = ({ images, handleDelete }: ImageGalleryProps) => {
  const { galleryImageClickHandler, clearGalleryImageClickHandler } =
    useImages();

  const handleImageClick = (image: ImageProps) => {
    if (galleryImageClickHandler) {
      galleryImageClickHandler(image);
      clearGalleryImageClickHandler();
    }
  };

  return (
    <>
      {images.length === 0 ? (
        <NoImages />
      ) : (
        <div className="relative grid h-full grid-cols-2 gap-4 overflow-y-auto p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((image, i: number) => (
            <div
              key={"gallery_image" + i}
              className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-100 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 dark:bg-zinc-800"
            >
              <button
                onClick={() => handleImageClick(image)}
                className="h-full w-full focus:outline-none"
              >
                <Image
                  src={image.url}
                  loading="lazy"
                  alt={image.description}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  className="transition-opacity duration-300 group-hover:opacity-75"
                />
              </button>
              <button
                onClick={() => handleDelete(image.uniqueName)}
                className="absolute right-2 top-2 z-40 rounded-full bg-white p-1 opacity-0 shadow-md transition-opacity duration-300 ease-in-out hover:bg-red-100 group-hover:opacity-100 dark:bg-zinc-700 dark:hover:bg-red-900"
              >
                <XCircle className="h-5 w-5 text-red-500" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="truncate text-sm text-white">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
