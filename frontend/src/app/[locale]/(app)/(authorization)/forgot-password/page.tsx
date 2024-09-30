import { ForgotPassword } from "@/components/(authorization)/forgot-password";

type Props = {
  params: { locale: string };
};

export default function ForgotPasswordPage({ params: { locale } }: Props) {
  return <ForgotPassword locale={locale} />;
}
