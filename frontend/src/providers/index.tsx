import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./auth";
import { JotaiProvider } from "./jotai";

export const Providers: ComponentWithChildren = (props) => {
  return (
    <JotaiProvider>
      <AuthProvider>
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
