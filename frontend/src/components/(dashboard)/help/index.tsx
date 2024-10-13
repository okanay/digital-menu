import { ComingSoon } from "../coming-soon";

type Props = {
  locale: string;
};

export default function HelpPage({}: Props) {
  return <ComingSoon pageName="Help" />;
}
