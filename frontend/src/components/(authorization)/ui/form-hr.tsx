import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export const FormHR: React.FC<Props> = (props) => {
  return <hr className={twMerge("my-6 border-corner/10", props.className)} />;
};
