import { MenuArts1Display } from "@/components/(menu)/render";

type Props = {
  params: { locale: string; id: string };
};

export default function MenuTest({ params: { locale } }: Props) {
  return <MenuArts1Display locale={locale} />;
}
