"use client";

import { ImageGalleryAuthError } from "@/components/image/gallery-auth-error";
import { GalleryDialog } from "@/components/image/gallery-dialog";
import { UploadDialog } from "@/components/image/upload.dialog";
import { useAuth } from "@/hooks/use-auth";
import { useDialog } from "./use-dialogu";

export const DialogueHandler: React.FC = () => {
  const { dialog } = useDialog();
  const auth = useAuth();

  const handleDialog = () => {
    switch (dialog) {
      case "global":
        return <></>;
      case "gallery":
        if (auth.user) {
          return <GalleryDialog />;
        }
        return <ImageGalleryAuthError />;
      case "upload":
        if (auth.user) {
          return <UploadDialog />;
        }
        return <ImageGalleryAuthError />;
    }
  };

  return <>{handleDialog()}</>;
};
