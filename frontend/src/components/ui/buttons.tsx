import { twMerge } from "tailwind-merge";

type ButtonProps = React.ComponentProps<"button"> & {
  children: React.ReactNode;
};

export const ButtonSecondary: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "h-[2.5rem] rounded-lg border border-primary-300 bg-gradient-to-tl from-primary-50/75 to-primary-100/20 px-5 text-sm tracking-wide text-primary-400 outline-4 outline-offset-[5px] outline-primary-400 transition-all duration-300 hover:opacity-75 active:scale-95 dark:border-primary-50/20 dark:from-primary-900/50 dark:to-primary-950 dark:text-primary-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonPrimary: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        `h-[2.5rem] rounded-lg border border-primary-300 bg-gradient-to-tl from-primary-400 to-primary-500 px-5 text-sm tracking-wide text-primary-50 outline-4 outline-offset-[5px] outline-primary-400 transition-all duration-300 hover:opacity-75 active:scale-95 dark:border-primary-950 dark:from-primary-600 dark:to-primary-800 dark:text-primary-50`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
