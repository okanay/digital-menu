import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<"div"> {}

export const LabelWrapper = ({ children, className, ref, ...props }: Props) => {
  return (
    <div
      {...props}
      ref={ref}
      className={twMerge("flex flex-col gap-1.5", className)}
    >
      {children}
    </div>
  );
};
