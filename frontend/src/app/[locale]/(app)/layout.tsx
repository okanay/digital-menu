import { EmailVerifyWarning } from "@/components/email-verify-warning";
import { MainProviders } from "@/providers";

export default function AppLayout(props: { children: React.ReactNode }) {
  return (
    <MainProviders>
      {props.children}
      <EmailVerifyWarning />
    </MainProviders>
  );
}
