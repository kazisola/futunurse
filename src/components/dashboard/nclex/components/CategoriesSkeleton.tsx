import { Skeleton } from "@/components/ui/skeleton";

// ── Single Category Card
function CategoryCardSkeleton({ topicCount }: { topicCount: number }) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">

      {/* Icon + title + subtitle */}
      <div className="flex items-start gap-3 sm:gap-4">
        <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
        <div className="space-y-2 min-w-0 flex-1">
          <Skeleton className="h-5 sm:h-6 w-48 sm:w-64 rounded" />
          <Skeleton className="h-4 w-full max-w-[18rem] rounded" />
        </div>
      </div>

      {/* Progress label + bar + percentage */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-3.5 w-16 rounded" />
          <Skeleton className="h-5 w-14 rounded-md shrink-0" />
        </div>
        <div className="relative h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <Skeleton className="absolute left-0 top-0 h-full w-1/3 rounded-full" />
        </div>
        <Skeleton className="h-3.5 w-32 rounded" />
      </div>

      {/* Key Topics */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-20 rounded" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: topicCount }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-7 rounded-full ${
                i === 0 ? "w-40" : i === 1 ? "w-44" : i === 2 ? "w-44" : i === 3 ? "w-28" : "w-32"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex items-center gap-3 pt-1">
        <Skeleton className="h-11 flex-1 rounded-lg" />
        <Skeleton className="h-11 w-32 rounded-lg shrink-0" />
      </div>
    </div>
  );
}

// ── Main Export
const CategoriesSkeleton = () => {
  return (
    <div
      className="min-h-screen">
      <div className="space-y-5 sm:space-y-6">

        {/* Page header */}
        <div className="space-y-2">
          <Skeleton className="h-7 sm:h-9 w-44 sm:w-56 rounded-md" />
          <Skeleton className="h-4 w-full max-w-xs sm:max-w-sm rounded" />
        </div>

        {/* Category cards — varying topic pill counts to look natural */}
        <CategoryCardSkeleton topicCount={5} />
        <CategoryCardSkeleton topicCount={2} />
        <CategoryCardSkeleton topicCount={3} />
        <CategoryCardSkeleton topicCount={4} />

      </div>
    </div>
  );
}

export default CategoriesSkeleton;