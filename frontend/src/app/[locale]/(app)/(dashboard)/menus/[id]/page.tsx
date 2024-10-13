import MenuPage from "@/components/(dashboard)/menus/[id]";

type Props = {
  params: { locale: string; id: string };
};

export default function Page({ params: { locale, id } }: Props) {
  return <MenuPage locale={locale} id={id} />;
}
