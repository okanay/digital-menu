import { MenuArts1Display } from "@/components/menu-arts-1/display";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function MenuPage(props: Props) {
  const params = await props.params;

  const { locale, id } = params;

  return <MenuArts1Display id={id} locale={locale} />;
}
