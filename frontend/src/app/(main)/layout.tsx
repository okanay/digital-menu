import { Header } from "@/components/header";

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
