export const Loader = () => {
  return (
    <div className="animate-pulse rounded-xl bg-white p-3">
      {/* Image placeholder (≈ 140px) */}
      <div className="h-[140px] w-full rounded-lg bg-gray-200" />
      {/* Title line */}
      <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
    </div>
  );
};
