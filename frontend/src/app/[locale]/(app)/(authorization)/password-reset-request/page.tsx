import { PasswordResetRequest } from "@/components/(authorization)/password-reset-request";
import { ProtectedRoute } from "@/providers/auth/protected-route";

type Props = {
  params: { locale: string };
};

export default function ForgotPasswordPage({ params: { locale } }: Props) {
  return (
    <ProtectedRoute accessLevel="non-auth-paths">
      <PasswordResetRequest locale={locale} />;
    </ProtectedRoute>
  );
}
