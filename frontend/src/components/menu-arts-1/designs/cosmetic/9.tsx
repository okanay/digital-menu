type Props = {};

// 9
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-green-700 to-green-700 opacity-40"></div>
        <div className="mx-4 flex items-center space-x-2">
          <span className="text-lg text-green-700 opacity-60">❀</span>
          <span className="text-xl text-green-700 opacity-60">🌿</span>
          <span className="text-lg text-green-700 opacity-60">✿</span>
          <span className="text-xl text-green-700 opacity-60">🌿</span>
          <span className="text-lg text-green-700 opacity-60">❀</span>
        </div>
        <div className="h-px flex-grow bg-gradient-to-r from-green-700 via-green-700 to-transparent opacity-40"></div>
      </div>
    </div>
  );
};
