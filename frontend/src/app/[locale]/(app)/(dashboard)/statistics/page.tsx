import StatisticsPage from "@/components/(dashboard)/statistics";

type Props = {
  params: {
    locale: string;
  };
};

export default function Page({ params: { locale } }: Props) {
  return <StatisticsPage locale={locale} />;
}
