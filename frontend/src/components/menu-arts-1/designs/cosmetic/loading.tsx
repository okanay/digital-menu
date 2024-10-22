const CosmeticLoading: React.FC = () => {
  return (
    <div className="my-2 flex w-full items-center justify-center">
      <div className="flex w-full max-w-4xl items-center">
        <div className="h-px flex-grow animate-pulse bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
      </div>
    </div>
  );
};

export default CosmeticLoading;
