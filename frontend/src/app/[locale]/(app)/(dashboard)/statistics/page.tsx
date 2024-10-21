import StatisticsPage from "@/components/(dashboard)/statistics";

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

  return <StatisticsPage locale={locale} />;
}
