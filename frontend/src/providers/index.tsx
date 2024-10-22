import { ThemeProvider } from "next-themes";
import { AuthWrapper } from "./auth/provider";
import { DialogueProvider } from "./dialogue";
import { LazyMotion, domAnimation } from "framer-motion";

export const MainProviders: ComponentWithChildren = async (props) => {
  return (
    <AuthWrapper>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <LazyMotion features={domAnimation}>
          <DialogueProvider>{props.children}</DialogueProvider>
        </LazyMotion>
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
      <LazyMotion features={domAnimation}>{props.children}</LazyMotion>
    </ThemeProvider>
  );
};
