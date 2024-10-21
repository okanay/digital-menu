import MenuPage from "@/components/(dashboard)/menus/[id]";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function Page(props: Props) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  return <MenuPage locale={locale} id={id} />;
}
