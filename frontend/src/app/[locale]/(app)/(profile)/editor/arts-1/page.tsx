import { MenuArts1 } from "@/components/(menu)/editor";

type Props = {
  params: { locale: string };
};

export default function EditorArts1Page({ params: { locale } }: Props) {
  return <MenuArts1 locale={locale} />;
}
