import { MainProviders } from "@/providers";

export default function AppLayout(props: { children: React.ReactNode }) {
  return <MainProviders>{props.children}</MainProviders>;
}
