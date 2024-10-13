import { ProfilePage } from "@/components/(dashboard)/dashboard";

type Props = {
  params: {
    locale: string;
  };
};

export default function Page({ params: { locale } }: Props) {
  return <ProfilePage locale={locale} />;
}
