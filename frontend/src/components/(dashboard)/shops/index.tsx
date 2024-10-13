import ShopsCards from "./cards";
import { ShopsPageHeader } from "./header";

type Props = {
  locale: string;
};

export default function ShopsPage({ locale }: Props) {
  return (
    <div className="h-[80vh] min-h-fit text-font-primary">
      <ShopsPageHeader />
      <ShopsCards locale={locale} />
    </div>
  );
}
