type Props = {};

// 12
export const Cosmetic: React.FC<Props> = ({}) => {
  return (
    <div className="my-3 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center overflow-hidden">
        <div className="relative h-px w-full bg-gray-300">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 transform text-xs text-gray-400"
              style={{ left: `${i * 5}%` }}
            >
              ✢
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
