import { CheckCircle, AlertCircle } from "lucide-react";

type Props = {
  isActive: boolean;
};
export const CardStatus = ({ isActive }: Props) => {
  return isActive ? (
    <span className="inline-flex items-center rounded-full border border-emerald-400 bg-emerald-100 px-3 py-1.5 text-emerald-400 dark:border-emerald-300 dark:bg-emerald-900 dark:text-emerald-300">
      <CheckCircle className="mr-1 h-4 w-4" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full border border-amber-400 bg-amber-100 px-3 py-1.5 text-amber-400 dark:border-amber-300 dark:bg-amber-900 dark:text-amber-300">
      <AlertCircle className="mr-1 h-4 w-4" />
      Passive
    </span>
  );
};
