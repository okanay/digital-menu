import dummyData from "@/constants/dummy-data";
import { MenuArts1Display } from "@/components/(menu)/render";

type Props = {
  params: { locale: string; id: string };
};

import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function MenuTest({ params: { locale, id } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("main");

  return <MenuArts1Display menu={dummyData} locale={"en"} />;
}
