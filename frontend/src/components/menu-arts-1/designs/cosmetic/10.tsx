type Props = {};

// 10
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="mr-4 flex items-center">
          <span className="text-xl text-gray-400">❦</span>
          <span className="mx-1 text-lg text-gray-400">❧</span>
          <span className="text-sm text-gray-400">❀</span>
        </div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
};
