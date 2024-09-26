// prettier-ignore
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { routing } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

type i18nMetadata = Omit<Props, "children">;

export async function generateMetadata(props: i18nMetadata) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: "root.metadata",
  });

  return {
    title: t("title"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: Props) {
  unstable_setRequestLocale(props.params.locale);
  const messages = await getMessages();

  return (
    <html lang={props.params.locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
