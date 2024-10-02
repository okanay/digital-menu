import { PropsWithChildren } from "react";
import { AuthProvider } from ".";
import { checkUser } from "./check-user";

export const AuthWrapper = async (props: PropsWithChildren) => {
  const initialUser = await checkUser();
  const initialSession = initialUser ? "authorize" : "unauthorize";

  return (
    <AuthProvider user={initialUser} session={initialSession}>
      {props.children}
    </AuthProvider>
  );
};
