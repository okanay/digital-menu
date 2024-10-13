import { ProfileLayout } from "@/components/(dashboard)/layout";
import { ProtectedRoute } from "@/providers/auth/protected-route";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ProtectedRoute accessLevel="protected">
      <ProfileLayout>{props.children}</ProfileLayout>
    </ProtectedRoute>
  );
}
