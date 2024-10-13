import MenusCards from "./cards";
import { MenusPageHeader } from "./header";

type Props = {
  locale: string;
};

export default function MenusPage({ locale }: Props) {
  return (
    <div className="h-[80vh] min-h-fit text-font-primary">
      <MenusPageHeader />
      <MenusCards locale={locale} />
    </div>
  );
}
