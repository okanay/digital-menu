import { SignUp } from "@/components/(authorization)/sign-up";

type Props = {
  params: { locale: string };
};

export default function SignUpPage({ params: { locale } }: Props) {
  return <SignUp locale={locale} />;
}
