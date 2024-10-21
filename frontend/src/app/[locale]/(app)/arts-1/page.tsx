import { MenuArts1 } from "@/components/(menu)/editor";
import { EmptyMenuDesignData } from "@/constants/menu-arts-1";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function EditorArts1Page(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  return (
    <main className="mx-auto max-w-xl">
      <MenuArts1
        locale={locale}
        initialJSON={JSON.stringify(EmptyMenuDesignData)}
      />
    </main>
  );
}
