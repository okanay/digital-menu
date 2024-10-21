import { ButtonSecondary } from "@/components/ui/buttons";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
type Props = {
  children?: React.ReactNode;
};

export const ReturnMenusButton = ({ children }: Props) => {
  return (
    <Link href="/menus">
      <ButtonSecondary className="flex items-center gap-2 text-xs sm:text-base">
        <ArrowLeft className="block size-4 sm:hidden" />
        <span className="hidden sm:block">{children || "Return"}</span>
      </ButtonSecondary>
    </Link>
  );
};
