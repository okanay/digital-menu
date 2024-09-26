import { headers } from "next/headers";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./auth";
import { JotaiProvider } from "./jotai";

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

export const MainProviders: ComponentWithChildren = async (props) => {
  const initialUser = await getUser();
  const initialSession = initialUser ? "authorize" : "unauthorize";

  return (
    <JotaiProvider>
      <AuthProvider user={initialUser} session={initialSession}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {props.children}
        </ThemeProvider>
      </AuthProvider>
    </JotaiProvider>
  );
};

export const MenusProviders: ComponentWithChildren = (props) => {
  return (
    <JotaiProvider>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {props.children}
      </ThemeProvider>
    </JotaiProvider>
  );
};
