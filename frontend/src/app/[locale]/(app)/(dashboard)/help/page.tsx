import HelpPage from "@/components/(dashboard)/help";

type Props = {
  params: {
    locale: string;
  };
};

export default function Page({ params: { locale } }: Props) {
  return <HelpPage locale={locale} />;
}
