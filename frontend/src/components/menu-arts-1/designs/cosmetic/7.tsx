type Props = {};

// 7
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="border-wavy flex-grow border-t border-gray-300"></div>
        <div className="mx-4 flex items-center">
          <span className="rotate-90 transform text-gray-400">≈</span>
          <div className="mx-2 h-2 w-2 rounded-full bg-gray-400"></div>
          <span className="rotate-90 transform text-gray-400">≈</span>
        </div>
        <div className="border-wavy flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
};
