export const CategoryLoading: React.FC = () => {
  return (
    <div className="relative animate-pulse">
      <div className="px-5 py-4">
        <div className="h-4 w-[40%] rounded bg-fill-primary" />
        <div className="mt-4 h-8 w-[65%] rounded bg-fill-secondary" />
      </div>
    </div>
  );
};

export default CategoryLoading;
