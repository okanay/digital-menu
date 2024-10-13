import AccountPage from "@/components/(dashboard)/account";

type Props = {
  params: {
    locale: string;
  };
};

export default function Page({ params: { locale } }: Props) {
  return <AccountPage locale={locale} />;
}
