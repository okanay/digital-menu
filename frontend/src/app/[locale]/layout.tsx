import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import fontSans from "@/assets/fonts/sans";
import fontSerif from "@/assets/fonts/serif";
import fontMono from "@/assets/fonts/mono";
import { Metadata } from "next";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

type Params = Promise<{ locale: string }>;

// prettier-ignore
export async function generateMetadata({params}: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'root.metadata'});

  return {
    title: t('title'),
    description: t('description'),
  };
}

// prettier-ignore
export default async function LocaleLayout(props: { children: React.ReactNode; params: Promise<{ locale: string }>}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}
      suppressHydrationWarning
      lang={locale}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
