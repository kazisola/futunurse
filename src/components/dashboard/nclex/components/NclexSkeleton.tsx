import { Skeleton } from "@/components/ui/skeleton";

// ── Practice Mode Cards
function PracticeCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 shrink-0 rounded" />
        <Skeleton className="h-5 w-32 rounded" />
      </div>
      <Skeleton className="h-3.5 w-full max-w-[13rem] rounded" />
      <Skeleton className="h-3.5 w-full rounded" />
      <Skeleton className="h-10 w-full rounded-lg mt-1" />
    </div>
  );
}

// ── Performance by Category
function CategoryRowSkeleton({ barW, nameW }: { barW: string; nameW: string }) {
  return (
    <div className="space-y-1.5">
      {/* Name — full width so long names never fight the badge */}
      <Skeleton className={`h-4 ${nameW} max-w-full rounded`} />
      {/* Count + badge on their own row — plenty of room */}
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-3.5 w-32 rounded" />
        <Skeleton className="h-5 w-14 rounded-md shrink-0" />
      </div>
      {/* Progress bar track */}
      <div className="relative h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <Skeleton className={`absolute left-0 top-0 h-full ${barW} rounded-full`} />
      </div>
    </div>
  );
}

function PerformanceSkeleton() {
  const rows = [
    { barW: "w-1/4", nameW: "w-64" },
    { barW: "w-1/3", nameW: "w-40" },
    { barW: "w-1/4", nameW: "w-48" },
    { barW: "w-1/6", nameW: "w-44" },
    { barW: "w-1/3", nameW: "w-56" },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 shrink-0 rounded" />
        <Skeleton className="h-5 w-44 rounded" />
      </div>
      <div className="space-y-5">
        {rows.map(({ barW, nameW }, i) => (
          <CategoryRowSkeleton key={i} barW={barW} nameW={nameW} />
        ))}
      </div>
    </div>
  );
}

// ── Recent Practice Sessions
function SessionRowSkeleton() {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-gray-100 last:border-0">
      <div className="space-y-1.5 min-w-0 flex-1">
        <Skeleton className="h-4 w-full max-w-[10rem] rounded" />
        <Skeleton className="h-3.5 w-20 rounded" />
      </div>
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <Skeleton className="h-4 w-10 rounded" />
        <Skeleton className="h-3.5 w-12 rounded" />
      </div>
    </div>
  );
}

function RecentSessionsSkeleton() {
  return (
    <div className="bg-white rounded-2xl px-5 sm:px-6 py-5 shadow-sm space-y-1">
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="h-5 w-5 shrink-0 rounded" />
        <Skeleton className="h-5 w-44 rounded" />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <SessionRowSkeleton key={i} />
      ))}
    </div>
  );
}

// ── Main Export
const NclexSkeleton = () => {
  return (
    <div
      className="min-h-screen">
      <div className=" space-y-5 sm:space-y-6">

        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <Skeleton className="h-7 sm:h-8 w-44 sm:w-56 rounded-md" />
            <Skeleton className="h-4 w-full max-w-xs sm:max-w-sm rounded" />
          </div>
          <Skeleton className="hidden sm:block h-10 w-36 rounded-lg shrink-0" />
        </div>

        {/* Practice mode cards — 2 col on sm+, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PracticeCardSkeleton />
          <PracticeCardSkeleton />
        </div>

        {/* Performance by Category */}
        <PerformanceSkeleton />

        {/* Recent Practice Sessions */}
        <RecentSessionsSkeleton />

      </div>
    </div>
  );
}

export default NclexSkeleton;