import { ThemeProvider } from "next-themes";
import { AuthWrapper } from "./auth/provider";
import { DialogueProvider } from "./dialogue";

export const MainProviders: ComponentWithChildren = async (props) => {
  return (
    <AuthWrapper>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <DialogueProvider>{props.children}</DialogueProvider>
      </ThemeProvider>
    </AuthWrapper>
  );
};

export const MenusProviders: ComponentWithChildren = (props) => {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {props.children}
    </ThemeProvider>
  );
};
