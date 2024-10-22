import { twMerge } from "tailwind-merge";
interface Props extends React.ComponentProps<"label"> {
  required?: boolean;
}

export const Label = ({
  children,
  className,
  required,
  ref,
  ...props
}: Props) => {
  return (
    <label
      ref={ref}
      className={twMerge(
        "relative block w-fit text-sm font-medium text-font",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="absolute -right-2.5 -top-1 text-xl text-primary-500/80">
          *
        </span>
      )}
    </label>
  );
};
