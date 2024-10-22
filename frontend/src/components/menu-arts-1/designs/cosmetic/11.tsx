type Props = {};

// 11
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-400">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-400">
            <span className="text-xs text-gray-400">✤</span>
          </div>
        </div>
      </div>
    </div>
  );
};
