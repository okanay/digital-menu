import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const SectionTitle: React.FC<Props> = (props) => {
  return (
    <h2
      className={twMerge(
        "text-center text-lg font-semibold uppercase tracking-tight text-font-primary dark:text-font",
        props.className,
      )}
    >
      {props.children}
    </h2>
  );
};
