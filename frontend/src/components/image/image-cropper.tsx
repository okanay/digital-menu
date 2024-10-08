import { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperProps {
  file: File;
  onCropComplete: (croppedFile: File) => void;
  onCancel: () => void;
}

export const ImageCropper = ({
  file,
  onCropComplete,
  onCancel,
}: ImageCropperProps) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
    x: 5,
    y: 5,
  });

  // Resmi yükle
  useState(() => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgSrc(reader.result?.toString() || "");
    });
    reader.readAsDataURL(file);
  });

  const getCroppedImg = useCallback(
    async (image: HTMLImageElement, crop: PixelCrop) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      );

      return new Promise<File>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(croppedFile);
          }
        }, file.type);
      });
    },
    [],
  );

  const handleCropComplete = useCallback(async () => {
    if (!imgRef.current) return;

    try {
      const croppedFile = await getCroppedImg(
        imgRef.current,
        crop as PixelCrop,
      );
      if (croppedFile) {
        onCropComplete(croppedFile);
      }
    } catch (error) {
      console.error("Crop error:", error);
    }
  }, [crop, getCroppedImg, onCropComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">Görseli Kırp</h3>

        {imgSrc && (
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={16 / 9}>
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Crop preview"
              className="max-h-[60vh] object-contain"
            />
          </ReactCrop>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-md border px-4 py-2 hover:bg-gray-100"
          >
            İptal
          </button>
          <button
            onClick={handleCropComplete}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
};
