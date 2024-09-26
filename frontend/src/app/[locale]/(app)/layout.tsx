import { Header } from "@/components/header";
import { MainProviders } from "@/providers";

export default function AppLayout(props: { children: React.ReactNode }) {
  return (
    <MainProviders>
      <Header />
      {props.children}
    </MainProviders>
  );
}
