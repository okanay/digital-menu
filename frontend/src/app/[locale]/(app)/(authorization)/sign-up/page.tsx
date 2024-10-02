import { SignUp } from "@/components/(authorization)/sign-up";
import { ProtectedRoute } from "@/providers/auth/protected-route";

type Props = {
  params: { locale: string };
};

export default function SignUpPage({ params: { locale } }: Props) {
  return (
    <ProtectedRoute accessLevel="non-auth-paths">
      <SignUp locale={locale} />
    </ProtectedRoute>
  );
}
