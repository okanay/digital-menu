import { SignUp } from "@/components/(authorization)/sign-up";
import { ProtectedRoute } from "@/providers/auth/protected-route";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SignUpPage(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  return (
    <ProtectedRoute accessLevel="non-auth-paths">
      <SignUp locale={locale} />
    </ProtectedRoute>
  );
}
