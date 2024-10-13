import ShopsPage from "@/components/(dashboard)/shops";

type Props = {
  params: { locale: string };
};

export default function Page({ params: { locale } }: Props) {
  return <ShopsPage locale={locale} />;
}
