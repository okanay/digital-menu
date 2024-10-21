import { PasswordResetRequest } from "@/components/(authorization)/password-reset-request";
import { ProtectedRoute } from "@/providers/auth/protected-route";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ForgotPasswordPage(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  return (
    <ProtectedRoute accessLevel="non-auth-paths">
      <PasswordResetRequest locale={locale} />;
    </ProtectedRoute>
  );
}
