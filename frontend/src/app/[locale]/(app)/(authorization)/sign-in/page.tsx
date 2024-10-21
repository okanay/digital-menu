import { SignIn } from "@/components/(authorization)/sign-in";
import { ProtectedRoute } from "@/providers/auth/protected-route";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SignInPage(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  return (
    <ProtectedRoute accessLevel="non-auth-paths">
      <SignIn locale={locale} />{" "}
    </ProtectedRoute>
  );
}
