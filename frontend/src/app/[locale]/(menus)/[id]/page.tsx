import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string; id: string };
};

export default function MenuPage({ params: { locale, id } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("main");

  return <div>page: {id}</div>;
}
