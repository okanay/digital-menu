import { CheckUserIsLoggedIn } from "@/components/check-user-is-logged-in";
import { Header } from "@/components/header";
import { MainProviders } from "@/providers";

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <MainProviders>
      <CheckUserIsLoggedIn />
      <Header />
      {props.children}
    </MainProviders>
  );
}
