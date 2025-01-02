import PerspectiveGrid from '../PerspectiveGrid';

export const Introduction = () => {
  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-9xl MinimalMono mb-4 text-textPrimary font-bold">
          0xff
        </h1>
        <p className="text-xl font-[family-name:var(--font-geist-sans)] text-textPrimary flex items-center justify-center gap-2">
          <span className="bg-black text-white px-3 py-1.5 rounded-lg">⌘</span>
          <span>+</span>
          <span className="bg-black text-white px-3 py-1.5 rounded-lg">C</span>
          <span className="mx-2">and</span>
          <span className="bg-black text-white px-3 py-1.5 rounded-lg">⌘</span>
          <span>+</span>
          <span className="bg-black text-white px-3 py-1.5 rounded-lg">V</span>
          <span className="ml-2">your next component.</span>
        </p>
        <p className="text-xl font-[family-name:var(--font-geist-mono)] text-textPrimary text-left italic pt-3">
          coming soon.
        </p>
      </div>
      <PerspectiveGrid />
    </div>
  );
};
