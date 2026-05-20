import { Skeleton } from "@/components/ui/skeleton";

// ── Left Panel
function LeftPanelSkeleton() {
  const savedCards = [32, 40, 24, 44, 36]; // varied name widths

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-5 h-[calc(100vh-3rem)]">

      {/* Title */}
      <div className="space-y-1.5">
        <Skeleton className="h-6 w-48 rounded-md" />
        <Skeleton className="h-4 w-36 rounded" />
      </div>

      {/* Search input */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
        <Skeleton className="h-4 w-4 rounded shrink-0" />
        <Skeleton className="h-4 flex-1 rounded" />
      </div>

      {/* Type filter tabs */}
      <div className="flex gap-2">
        {["w-16", "w-12", "w-24"].map((w, i) => (
          <Skeleton key={i} className={`h-9 ${w} rounded-lg`} />
        ))}
      </div>

      {/* Search button */}
      <Skeleton className="h-11 w-full rounded-lg" />

      {/* Try These */}
      <div className="space-y-2.5">
        <Skeleton className="h-3 w-16 rounded" />
        <div className="flex flex-wrap gap-2">
          {[28, 24, 20, 24, 24, 12, 32, 20].map((w, i) => (
            <Skeleton key={i} className={`h-7 w-${w} rounded-full`} />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Saved Cards */}
      <div className="space-y-1">
        <Skeleton className="h-3 w-24 rounded mb-3" />
        {savedCards.map((w, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-4 w-4 rounded shrink-0" />
              <Skeleton className={`h-4 w-${w} rounded`} />
            </div>
            <Skeleton className="h-4 w-4 rounded shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Right Panel (empty state)
function RightPanelSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm flex-1 flex flex-col items-center justify-center gap-3 p-8 h-[calc(100vh-3rem)]">
      <Skeleton className="h-14 w-14 rounded-2xl" />
      <Skeleton className="h-5 w-44 rounded-md" />
      <div className="space-y-1.5 flex flex-col items-center">
        <Skeleton className="h-4 w-64 rounded" />
        <Skeleton className="h-4 w-52 rounded" />
      </div>
    </div>
  );
}

// ── Main Export
const CompanionSkeleton = () => {
  return (
    <div
      className="">
      {/* Two-column layout on lg, stacked on mobile */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start">
        {/* Left panel — fixed width on desktop */}
        <div className="w-full lg:w-80 xl:w-96 shrink-0">
          <LeftPanelSkeleton />
        </div>
        {/* Right panel — fills remaining space */}
        <div className="w-full flex-1">
          <RightPanelSkeleton />
        </div>
      </div>
    </div>
  );
}

export default CompanionSkeleton;