type Props = {};

// 0
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        <div className="mx-4 flex items-center">
          <div className="h-1 w-1 rounded-full bg-gray-400"></div>
          <div className="mx-2 h-3 w-3 rotate-45 border border-gray-400"></div>
          <div className="h-1 w-1 rounded-full bg-gray-400"></div>
        </div>
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>
    </div>
  );
};
