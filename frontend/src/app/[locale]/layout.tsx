import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { type Metadata } from "next";
import "./globals.css";

type i18Metadata = {
  params: { locale: Locale };
};

// prettier-ignore
export async function generateMetadata({ params: { locale }}: i18Metadata): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "root" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

type Props = {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
};

const RootLayout: React.FC<Props> = async (props) => {
  const messages = await getMessages();

  return (
    <html lang={props.params.locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
