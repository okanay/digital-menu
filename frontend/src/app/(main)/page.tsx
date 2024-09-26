import { useTranslations } from "next-intl";

export default function MainPage() {
  const t = useTranslations("HomePage");

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 bg-primary-50">
      <h1>{t("title")}</h1>
    </main>
  );
}
