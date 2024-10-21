import ShopsPage from "@/components/(dashboard)/shops";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  return <ShopsPage locale={locale} />;
}
