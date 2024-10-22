type Props = {};

// 2
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="flex-grow border-t-2 border-double border-gray-300"></div>
        <div className="mx-4 flex items-center">
          <div className="h-2 w-2 rotate-45 border border-gray-400"></div>
          <div className="mx-2 text-gray-400">❀</div>
          <div className="h-2 w-2 rotate-45 border border-gray-400"></div>
        </div>
        <div className="flex-grow border-t-2 border-double border-gray-300"></div>
      </div>
    </div>
  );
};
