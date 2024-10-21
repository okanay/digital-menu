import HelpPage from "@/components/(dashboard)/help";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  return <HelpPage locale={locale} />;
}
