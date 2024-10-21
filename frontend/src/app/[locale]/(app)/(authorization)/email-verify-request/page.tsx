import { EmailVerifyRequest } from "@/components/(authorization)/email-verify-request";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function EmailVerifyPage(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  return <EmailVerifyRequest locale={locale} />;
}
