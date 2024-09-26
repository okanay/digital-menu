import { useTranslations } from "next-intl";

export default function MainPage() {
  const t = useTranslations("main-page");
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 bg-primary-50">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
    </main>
  );
}
