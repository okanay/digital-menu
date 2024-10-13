import ShopPage from "@/components/(dashboard)/shops/[id]";

type Props = {
  params: { locale: string; id: string };
};

export default function Page({ params: { locale, id } }: Props) {
  return <ShopPage locale={locale} id={id} />;
}
