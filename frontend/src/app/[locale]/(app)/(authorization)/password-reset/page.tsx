import { PasswordReset } from "@/components/(authorization)/password-reset";
import { ProtectedRoute } from "@/providers/auth/protected-route";

type Props = {
  params: { locale: string };
};

export default function ForgotPasswordPage({ params: { locale } }: Props) {
  return (
    <ProtectedRoute accessLevel="non-auth-paths">
      <PasswordReset locale={locale} />
    </ProtectedRoute>
  );
}
