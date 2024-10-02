import { SignIn } from "@/components/(authorization)/sign-in";
import { ProtectedRoute } from "@/providers/auth/protected-route";

type Props = {
  params: { locale: string };
};

export default function SignInPage({ params: { locale } }: Props) {
  return (
    <ProtectedRoute accessLevel="non-auth-paths">
      <SignIn locale={locale} />{" "}
    </ProtectedRoute>
  );
}
