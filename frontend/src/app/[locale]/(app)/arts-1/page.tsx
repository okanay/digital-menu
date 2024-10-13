import { MenuArts1 } from "@/components/(menu)/editor";
import { TestMenuData } from "@/constants/dummy-data";

type Props = {
  params: { locale: string };
};

export default function EditorArts1Page({ params: { locale } }: Props) {
  return (
    <main className="mx-auto max-w-xl">
      <MenuArts1 locale={locale} initialData={TestMenuData} />
    </main>
  );
}
