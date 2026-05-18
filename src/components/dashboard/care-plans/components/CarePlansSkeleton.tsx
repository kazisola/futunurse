import { Skeleton } from "@/components/ui/skeleton";

// ── Single Care Plan Card Skeleton
function CarePlanCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-4">
      {/* Title row + badges */}
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-6 w-36 sm:w-44 rounded-md" />
        <div className="flex items-center gap-2 shrink-0">
          <Skeleton className="h-6 w-20 sm:w-24 rounded-full" />
          <Skeleton className="h-6 w-20 sm:w-24 rounded-full" />
        </div>
      </div>

      {/* Diagnosis line */}
      <Skeleton className="h-4 w-full max-w-[18rem] rounded" />

      {/* Dates row */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-4 shrink-0 rounded" />
          <Skeleton className="h-3.5 w-28 rounded" />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-4 shrink-0 rounded" />
          <Skeleton className="h-3.5 w-28 rounded" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="max-lg:grid max-lg:grid-cols-5 flex items-center gap-2 sm:gap-3 mt-1">
        <Skeleton className="h-9 w-32 rounded-lg max-lg:col-span-3" />
        <Skeleton className="h-9 w-9 rounded-md ml-1" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  );
}

// ── Main Export
const CarePlansSkeleton = () => {
  return (
    <div
      className="min-h-screen">
      <div className=" space-y-5 sm:space-y-6">

        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 sm:h-10 w-48 sm:w-64 rounded-md" />
            <Skeleton className="h-4 w-full max-w-[28rem] rounded" />
            <div className="flex items-center gap-4 pt-0.5">
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-4 w-4 rounded shrink-0" />
                <Skeleton className="h-3.5 w-20 rounded" />
              </div>
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-4 w-4 rounded shrink-0" />
                <Skeleton className="h-3.5 w-16 rounded" />
              </div>
            </div>
          </div>

          {/* Header buttons — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-36 rounded-lg" />
          </div>
        </div>

        {/* Cards grid — 2 col on lg, 1 col on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <CarePlanCardSkeleton />
          <CarePlanCardSkeleton />
          <CarePlanCardSkeleton />
          <CarePlanCardSkeleton />
          {/* 5th card spans only left column like in the UI */}
          <div className="lg:col-span-1">
            <CarePlanCardSkeleton />
          </div>
        </div>

      </div>
    </div>
  );
}

export default CarePlansSkeleton;