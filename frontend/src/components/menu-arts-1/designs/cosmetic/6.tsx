type Props = {};

// 6
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
        <div className="mx-4 flex items-center space-x-2">
          <div className="h-1 w-1 rounded-full bg-gray-400"></div>
          <div className="h-4 w-1 bg-gray-300"></div>
          <div className="h-4 w-4 rounded-full border-2 border-gray-400"></div>
          <div className="h-4 w-1 bg-gray-300"></div>
          <div className="h-1 w-1 rounded-full bg-gray-400"></div>
        </div>
        <div className="h-px flex-grow bg-gradient-to-r from-gray-300 via-gray-300 to-transparent"></div>
      </div>
    </div>
  );
};
