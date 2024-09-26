import { MenuProviders } from "@/providers";

export default function MenuLayout(props: { children: React.ReactNode }) {
  return <MenuProviders>{props.children}</MenuProviders>;
}
