import { ComingSoon } from "../coming-soon";

type Props = {
  locale: string;
};

export default function AccountPage({}: Props) {
  return <ComingSoon pageName="Account" />;
}
