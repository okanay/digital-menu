import { EmailVerify } from "@/components/(authorization)/email-verify";

type Props = {
  params: { locale: string };
};

export default function EmailVerifyPage({ params: { locale } }: Props) {
  return <EmailVerify locale={locale} />;
}
