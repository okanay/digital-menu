import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const FormTitle: React.FC<Props> = ({ children, className }) => {
  return (
    <h3
      className={twMerge(
        "text-3xl font-semibold tracking-wide text-primary-400",
        className,
      )}
    >
      {children}
    </h3>
  );
};
