type Props = {};

// 4
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
        <div className="mx-4 -rotate-90 transform text-xl text-gray-400">§</div>
        <div className="h-px flex-grow bg-gradient-to-r from-gray-300 via-gray-300 to-transparent"></div>
      </div>
    </div>
  );
};
