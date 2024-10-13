import { ComingSoon } from "../coming-soon";

type Props = {
  locale: string;
};

export default function StatisticsPage({}: Props) {
  return <ComingSoon pageName="Statistics" />;
}
