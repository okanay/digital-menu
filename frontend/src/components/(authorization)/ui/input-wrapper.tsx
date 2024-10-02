import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const InputWrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={twMerge("relative flex items-center", className)}>
      {children}
    </div>
  );
};
