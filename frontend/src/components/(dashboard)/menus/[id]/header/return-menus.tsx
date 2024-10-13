import { ButtonSecondary } from "@/components/ui/buttons";
import { Link } from "@/providers/i18n/routing";
import { ArrowLeft } from "lucide-react";
type Props = {
  children?: React.ReactNode;
};

export const ReturnMenusButton = ({ children }: Props) => {
  return (
    <Link href="/menus">
      <ButtonSecondary className="flex items-center gap-2">
        <ArrowLeft className="size-4 text-font" />
        {children || "Return"}
      </ButtonSecondary>
    </Link>
  );
};
