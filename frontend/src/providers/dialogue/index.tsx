"use client";

import { ImageGalleryAuthError } from "@/components/image/gallery-auth-error";
import { GalleryDialog } from "@/components/image/gallery-dialog";
import { UploadDialog } from "@/components/image/upload.dialog";
import { useAuth } from "@/hooks/use-auth";
import { useDialog } from "./use-dialogu";
import { CreateShopDialog } from "@/components/(dashboard)/shops/dialogues/create";
import { UpdateShopDialog } from "@/components/(dashboard)/shops/dialogues/update";
import { CreateMenuDialog } from "@/components/(dashboard)/menus/dialogues/create";
import { CustomStyleDialog } from "@/components/(menu)/editor/options/custom-style/dialog";
import { twMerge } from "tailwind-merge";
import { AllergensDialog } from "@/components/(menu)/editor/sections/category-item/options/allergens-options";
import { DiscountDialog } from "@/components/(menu)/editor/sections/category-item/options/discount-options";

type Props = {
  children: React.ReactNode;
};

export const DialogueProvider = ({ children }: Props) => {
  const { dialog } = useDialog();
  const { user } = useAuth();

  const renderDialog = () => {
    if (!user && (dialog === "gallery" || dialog === "upload")) {
      return <ImageGalleryAuthError />;
    }

    switch (dialog) {
      case "gallery":
        return <GalleryDialog />;
      case "upload":
        return <UploadDialog />;
      case "create-shop":
        return <CreateShopDialog />;
      case "update-shop":
        return <UpdateShopDialog />;
      case "create-menu":
        return <CreateMenuDialog />;
      case "custom-style":
        return <CustomStyleDialog />;
      case "allergens-options":
        return <AllergensDialog />;
      case "discount-options":
        return <DiscountDialog />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={twMerge(
          "absolute left-0 top-0 h-screen w-full overflow-y-auto",
          dialog === "idle" ? "hidden" : "block",
        )}
      >
        {renderDialog()}
      </div>
      {children}
    </>
  );
};
