import { Link } from "@/i18n/routing";
import { useDialog } from "@/providers/dialogue/use-dialogu";
import { MessageCircleWarning } from "lucide-react";
import { ButtonSecondary } from "../ui/buttons";
import { DialogWrapper } from "./dialog-wrapper";

export const ImageGalleryAuthError = ({}) => {
  const { setDialog } = useDialog();

  return (
    <DialogWrapper title="Unauthorized Access">
      <div className="flex h-96 flex-col items-center justify-center space-y-4 text-center">
        <MessageCircleWarning className="h-12 w-12 text-primary-500" />
        <p className="max-w-[320px] text-balance text-sm font-medium text-zinc-700 dark:text-zinc-300">
          To access the image gallery, you must be logged in.
        </p>
        <Link href="/sign-in">
          <ButtonSecondary
            onClick={() => setDialog("idle")}
            className="flex items-center justify-center gap-2 rounded-full"
          >
            <span>Login</span>
          </ButtonSecondary>
        </Link>
      </div>
    </DialogWrapper>
  );
};
