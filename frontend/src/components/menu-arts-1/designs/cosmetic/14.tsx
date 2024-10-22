type Props = {};

// 14
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="mr-2 -rotate-90 transform text-xl text-gray-400">§</div>
        <div
          className="flex-grow border-t border-gray-300"
          style={{
            borderTopStyle: "groove",
          }}
        ></div>
        <div className="ml-2 rotate-90 transform text-xl text-gray-400">§</div>
      </div>
    </div>
  );
};
