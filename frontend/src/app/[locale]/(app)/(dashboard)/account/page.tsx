import AccountPage from "@/components/(dashboard)/account";

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

  return <AccountPage locale={locale} />;
}
