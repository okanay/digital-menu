import MenusPage from "@/components/(dashboard)/menus";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  return <MenusPage locale={locale} />;
}
