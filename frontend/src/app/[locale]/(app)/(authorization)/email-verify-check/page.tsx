import { EmailVerifyCheck } from "@/components/(authorization)/email-verify-check";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function EmailVerifyPage(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  return <EmailVerifyCheck locale={locale} />;
}
