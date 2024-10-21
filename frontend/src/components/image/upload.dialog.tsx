import React from "react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Image, Upload, XCircle, Crop } from "lucide-react";
import { ButtonPrimary, ButtonSecondary } from "../ui/buttons";
import { DialogWrapper } from "./dialog-wrapper";
import { ImageCropper } from "./image-cropper";
import { useDialog } from "@/providers/dialogue/use-dialogu";

export const UploadDialog: React.FC = (props) => {
  const { setDialog } = useDialog();
  const {
    handleFileRemove,
    updateFileAttributes,
    files,
    handleFileAdd,
    startUpload,
    uploading,
    fileInputRef,
    length,
    setCropFile,
    cropFile,
    handleCropComplete,
  } = useFileUpload();

  return (
    <DialogWrapper
      title="Upload Image"
      menu={
        <>
          <ButtonSecondary
            onClick={() => setDialog("gallery")}
            className="flex items-center justify-center gap-2 rounded-full"
          >
            Gallery
          </ButtonSecondary>
        </>
      }
    >
      <div className="relative h-full overflow-hidden overflow-y-auto">
        <div className="flex h-full w-full flex-col gap-4">
          <p className="text-sm text-font-primary">
            Select a file to upload and add alt text for better SEO.
          </p>
          <div className="flex flex-col">
            {files.map((file, index) => (
              <div key={index} className="rounded-lg py-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-font-primary">
                    {file.file.name}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCropFile(file)}
                      className="text-primary-400 transition duration-300 ease-in-out hover:text-primary-600"
                    >
                      <Crop className="size-7 rounded-full border border-corner/10 bg-fill p-1.5 text-primary-500 transition-all duration-300 hover:opacity-75 active:scale-[88%] dark:text-primary-400" />
                    </button>
                    <button
                      onClick={() => handleFileRemove(file)}
                      className="text-red-400 transition duration-300 ease-in-out hover:text-red-600"
                    >
                      <XCircle className="size-7 rounded-full border border-corner/10 bg-fill p-1.5 text-rose-500 transition-all duration-300 hover:opacity-75 active:scale-[88%] dark:text-rose-400" />
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Alt Metin"
                  value={file.description}
                  onChange={(e) =>
                    updateFileAttributes(file, {
                      description: e.target.value,
                    })
                  }
                  className="mb-3 w-full rounded-md border border-corner/10 bg-fill px-3 py-2 text-sm text-font-primary focus:border-primary-400 focus:outline-none"
                />
                <div className="relative flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                      {file.status}
                    </span>
                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">
                      {file.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-primary-100 dark:bg-primary-900">
                    <div
                      style={{ width: `${file.progress}%` }}
                      className="h-full bg-primary-500 transition-all duration-300 ease-in-out"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex h-12 gap-4">
              <ButtonPrimary
                className="flex h-full w-1/2 items-center justify-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image size={20} />
                Select Files
              </ButtonPrimary>
              <input
                hidden
                type="file"
                ref={fileInputRef}
                onChange={handleFileAdd}
                multiple
              />
              <ButtonSecondary
                className="flex h-full w-1/2 items-center justify-center gap-2"
                onClick={startUpload}
                disabled={length === 0 || uploading}
              >
                <Upload size={20} />
                Upload
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
      {cropFile && (
        <ImageCropper
          file={cropFile.file}
          onCropComplete={(croppedFile) =>
            handleCropComplete(cropFile, croppedFile)
          }
          onCancel={() => setCropFile(null)}
        />
      )}
    </DialogWrapper>
  );
};
