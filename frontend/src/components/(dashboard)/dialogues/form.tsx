import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentProps<"form"> {
  submit?: () => void;
}

export const Form = ({ children, className, submit, ref, ...props }: Props) => {
  return (
    <form
      ref={ref}
      {...props}
      className={twMerge("mt-4 flex flex-col gap-2", className)}
      onSubmit={async (e) => {
        e.preventDefault();
        submit?.();
      }}
    >
      {children}
    </form>
  );
};
