type Props = {};

// 5
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="flex-grow border-t-2 border-double border-gray-300"></div>
        <div className="mx-4 flex items-center">
          <span className="text-lg text-gray-400">✤</span>
          <div className="mx-2 text-xl text-gray-400">❦</div>
          <span className="text-lg text-gray-400">✤</span>
        </div>
        <div className="flex-grow border-t-2 border-double border-gray-300"></div>
      </div>
    </div>
  );
};
