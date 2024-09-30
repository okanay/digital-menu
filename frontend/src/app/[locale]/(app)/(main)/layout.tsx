import { Footer } from "@/components/(main)/footer";
import { Header } from "@/components/(main)/header";

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
