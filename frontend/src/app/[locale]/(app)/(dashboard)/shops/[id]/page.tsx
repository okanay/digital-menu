import ShopPage from "@/components/(dashboard)/shops/[id]";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function Page(props: Props) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  return <ShopPage locale={locale} id={id} />;
}
