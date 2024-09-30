import { SignIn } from "@/components/(authorization)/sign-in";

type Props = {
  params: { locale: string };
};

export default function SignInPage({ params: { locale } }: Props) {
  return <SignIn locale={locale} />;
}
