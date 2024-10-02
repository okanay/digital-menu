type Props = {
  children: React.ReactNode;
};
export const FormErrorMessage = (props: Props) => {
  return (
    <div
      className="-my-4 rounded-lg bg-red-50 p-2 text-center text-xs text-red-800 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      {props.children}
    </div>
  );
};

export const FormSuccessMessage = (props: Props) => {
  return (
    <div
      className="-my-4 rounded-lg bg-green-50 p-2 text-center text-xs text-green-800 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      {props.children}
    </div>
  );
};
