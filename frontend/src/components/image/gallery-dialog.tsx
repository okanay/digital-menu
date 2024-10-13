import { useImages } from "@/hooks/use-images";
import { useDialog } from "@/providers/dialogue/use-dialogu";

import { ButtonSecondary } from "../ui/buttons";
import { DialogWrapper } from "./dialog-wrapper";
import { ImageGalleryError } from "./gallery-error";
import { ImageGalleryLoading } from "./gallery-loading";
import { ImagesGallery } from "./gallery-success";

export const GalleryDialog: React.FC = () => {
  const { setDialog } = useDialog();
  const { images, imageFetchStatus, handleRefresh, handleDeleteRequest } =
    useImages();

  return (
    <DialogWrapper
      title="Insert From Gallery"
      menu={
        <>
          <ButtonSecondary
            onClick={() => setDialog("upload")}
            className="flex items-center justify-center gap-2 rounded-full"
          >
            Upload
          </ButtonSecondary>
          <ButtonSecondary
            onClick={() => handleRefresh()}
            className="flex items-center justify-center gap-2 rounded-full"
          >
            Refresh
          </ButtonSecondary>
        </>
      }
    >
      {imageFetchStatus === "loading" ? (
        <ImageGalleryLoading />
      ) : imageFetchStatus === "error" ? (
        <ImageGalleryError handleRefresh={handleRefresh} />
      ) : (
        <ImagesGallery images={images} handleDelete={handleDeleteRequest} />
      )}
    </DialogWrapper>
  );
};
