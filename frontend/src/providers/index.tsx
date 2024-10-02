import { ThemeProvider } from "next-themes";
import { JotaiProvider } from "./jotai";
import { AuthWrapper } from "./auth/provider";

export const MainProviders: ComponentWithChildren = async (props) => {
  return (
    <JotaiProvider>
      <AuthWrapper>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {props.children}
        </ThemeProvider>
      </AuthWrapper>
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
