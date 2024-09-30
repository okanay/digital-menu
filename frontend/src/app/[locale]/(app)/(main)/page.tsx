import { Main } from "@/components/(main)/main";

type Props = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: Props) {
  return <Main locale={locale} />;
}
