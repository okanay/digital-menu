import { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ButtonPrimary, ButtonSecondary } from "../ui/buttons";
import useClickOutside from "@/hooks/use-click-outside";

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
    width: 60,
    height: 40,
    x: 5,
    y: 5,
  });
  const ref = useClickOutside<HTMLDivElement>(onCancel);

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
    <div className="fixed inset-0 flex items-center justify-center bg-fill-secondary/40">
      <div ref={ref} className="w-full max-w-xl rounded-lg bg-fill p-4">
        <h3 className="mb-4 text-lg font-semibold text-font">
          Set the image crop area
        </h3>

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
          <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
          <ButtonPrimary onClick={handleCropComplete}>Crop</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};
