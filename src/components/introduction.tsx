import PerspectiveGrid from './PerspectiveGrid';

export const Introduction = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="max-w-2xl space-y-4 z-10">
        <h1 className="text-7xl laptop:text-9xl MinimalMono mb-4 text-textPrimary font-bold text-center laptop:text-left">
          0xFF
        </h1>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[70%]">
        <PerspectiveGrid />
      </div>
    </div>
  );
};
