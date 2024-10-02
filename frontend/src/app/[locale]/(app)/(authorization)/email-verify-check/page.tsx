import { EmailVerifyCheck } from "@/components/(authorization)/email-verify-check";

type Props = {
  params: { locale: string };
};

export default function EmailVerifyPage({ params: { locale } }: Props) {
  return <EmailVerifyCheck locale={locale} />;
}
