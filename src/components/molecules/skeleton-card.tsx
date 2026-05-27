export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex animate-pulse gap-4">
        <div className="size-12 rounded-full bg-white/10" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-40 rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-20 rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}
