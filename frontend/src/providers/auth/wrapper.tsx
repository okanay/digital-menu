import { headers } from "next/headers";
import { PropsWithChildren } from "react";
import { AuthProvider } from ".";

export const AuthWrapper = async (props: PropsWithChildren) => {
  const initialUser = await getUser();
  const initialSession = initialUser ? "authorize" : "unauthorize";

  return (
    <AuthProvider user={initialUser} session={initialSession}>
      {props.children}
    </AuthProvider>
  );
};

async function getUser(): Promise<User | null> {
  const headersList = headers();
  const userData = headersList.get("X-User-Data");

  if (userData) {
    try {
      return JSON.parse(Buffer.from(userData, "base64").toString());
    } catch (error) {
      console.error("Error decoding user data:", error);
    }
  }
  return null;
}
