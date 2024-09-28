// prettier-ignore
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { routing } from "@/providers/i18n/routing";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import fontSans from "@/assets/fonts/sans";
import fontSerif from "@/assets/fonts/serif";
import fontMono from "@/assets/fonts/mono";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

type i18nMetadata = Omit<Props, "children">;

export async function generateMetadata(props: i18nMetadata): Promise<Metadata> {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: "root.metadata",
  });

  return {
    title: t("title"),
  };
}

export default async function LocaleLayout(props: Props) {
  unstable_setRequestLocale(props.params.locale);
  const messages = await getMessages();

  return (
    <html
      lang={props.params.locale}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}
    >
      <body className="bg-white text-font dark:bg-black">
        <NextIntlClientProvider messages={messages}>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }
