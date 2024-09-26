import { MenusProviders } from "@/providers";

export default function MenusLayout(props: { children: React.ReactNode }) {
  return <MenusProviders>{props.children}</MenusProviders>;
}
