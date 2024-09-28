import { Footer } from "@/components/(main)/footer";
import { Header } from "@/components/(main)/header";
import { MainProviders } from "@/providers";

export default function AppLayout(props: { children: React.ReactNode }) {
  return (
    <MainProviders>
      <Header />
      {props.children}
      <Footer />
    </MainProviders>
  );
}
