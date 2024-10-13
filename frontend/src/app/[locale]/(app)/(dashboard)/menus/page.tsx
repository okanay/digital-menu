import MenusPage from "@/components/(dashboard)/menus";

type Props = {
  params: { locale: string };
};

export default function Page({ params: { locale } }: Props) {
  return <MenusPage locale={locale} />;
}
