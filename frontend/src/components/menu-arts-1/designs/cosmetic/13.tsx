type Props = {};

// 13
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="h-px w-20 bg-gradient-to-r from-amber-700 to-transparent opacity-60"></div>
        <div className="flex-grow border-t border-dashed border-gray-300"></div>
        <div className="h-px w-20 bg-gradient-to-l from-amber-700 to-transparent opacity-60"></div>
      </div>
    </div>
  );
};
