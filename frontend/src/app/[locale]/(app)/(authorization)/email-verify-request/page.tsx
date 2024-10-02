import { EmailVerifyRequest } from "@/components/(authorization)/email-verify-request";

type Props = {
  params: { locale: string };
};

export default function EmailVerifyPage({ params: { locale } }: Props) {
  return <EmailVerifyRequest locale={locale} />;
}
