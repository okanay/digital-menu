import { ProfilePage } from "@/components/(dashboard)/dashboard";

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

  return <ProfilePage locale={locale} />;
}
