import { Main } from "@/components/(main)/main";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  return <Main locale={locale} />;
}
