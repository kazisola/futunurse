import { Skeleton } from "@/components/ui/skeleton";

// Stat Cards Row
function StatCardSkeleton({ accent }: { accent: string }) {
  return (
    <div className={`${accent} rounded-2xl p-3 sm:p-4 flex flex-col justify-between min-h-[110px] sm:min-h-[120px]`}>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Skeleton className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 rounded-md bg-white/30" />
        <Skeleton className="h-3.5 sm:h-4 w-full max-w-[7rem] rounded bg-white/30" />
      </div>
      <Skeleton className="h-7 sm:h-8 w-14 sm:w-16 rounded bg-white/30 mt-2" />
      <div className="flex justify-between items-center mt-2">
        <Skeleton className="h-3 w-14 rounded bg-white/30" />
        <Skeleton className="h-4 w-5 rounded bg-white/30" />
      </div>
    </div>
  );
}

// Quick Action Cards
function QuickActionSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 shrink-0 rounded" />
        <Skeleton className="h-5 w-32 rounded" />
      </div>
      <Skeleton className="h-3.5 w-full max-w-[12rem] rounded" />
      <Skeleton className="h-4 w-20 rounded" />
    </div>
  );
}

// Performance Trend Chart
function PerformanceTrendSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
      <Skeleton className="h-5 w-36 rounded mb-1" />
      <Skeleton className="h-3.5 w-full max-w-[13rem] rounded mb-4" />
      {/* Y-axis lines */}
      <div className="relative h-40 sm:h-48 flex flex-col justify-between">
        {[100, 75, 50, 25, 0].map((v) => (
          <div key={v} className="flex items-center gap-2">
            <Skeleton className="h-3 w-5 sm:w-6 shrink-0 rounded" />
            <Skeleton className="h-px flex-1 rounded bg-gray-100" />
          </div>
        ))}
        {/* Fake line chart wave */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 400 160"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,130 60,110 120,105 180,100 240,108 300,80 360,20 400,5"
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
          />
        </svg>
      </div>
      {/* X-axis labels — show 4 on mobile, 7 on sm+ */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-3 rounded ${i === 0 || i === 2 || i === 4 || i === 6 ? "w-10 sm:w-14" : "w-0 sm:w-14 opacity-0 sm:opacity-100"}`}
          />
        ))}
      </div>
    </div>
  );
}

// Bottom Charts
function BarChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
      <Skeleton className="h-5 w-40 sm:w-48 rounded mb-1" />
      <Skeleton className="h-3.5 w-32 sm:w-40 rounded mb-4" />
      <div className="flex items-end justify-center gap-6 sm:gap-8 h-28 sm:h-32">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-12 sm:w-14 h-16 sm:h-20 rounded-t-md" />
          <Skeleton className="h-3 w-10 sm:w-12 rounded" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-12 sm:w-14 h-24 sm:h-28 rounded-t-md" />
          <Skeleton className="h-3 w-12 sm:w-14 rounded" />
        </div>
      </div>
      <Skeleton className="h-3 w-full max-w-[16rem] rounded mt-3 mx-auto" />
    </div>
  );
}

function RadarChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <Skeleton className="h-5 w-40 rounded mb-1" />
      <Skeleton className="h-3.5 w-48 rounded mb-4" />
      <div className="flex items-center justify-center h-36">
        <div className="relative w-32 h-32">
          {/* Concentric hexagon rings */}
          {[32, 48, 64].map((size) => (
            <div
              key={size}
              className="absolute inset-0 m-auto rounded-full border border-gray-200"
              style={{ width: size * 2, height: size * 2, top: `calc(50% - ${size}px)`, left: `calc(50% - ${size}px)` }}
            />
          ))}
          <Skeleton className="absolute inset-0 m-auto w-16 h-16 rounded-full opacity-20" />
        </div>
      </div>
    </div>
  );
}

// Right Panel: Personalized Suggestions
function SuggestionsSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <Skeleton className="h-4 w-4 shrink-0 rounded" />
        <Skeleton className="h-5 w-40 sm:w-44 rounded" />
      </div>
      <Skeleton className="h-3.5 w-full max-w-[14rem] rounded mb-4" />
      <div className="space-y-2">
        {/* Expanded first item */}
        <div className="border border-gray-100 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
              <Skeleton className="h-4 w-28 sm:w-36 rounded" />
            </div>
            <Skeleton className="h-4 w-4 shrink-0 rounded" />
          </div>
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-5/6 rounded" />
          <Skeleton className="h-3 w-4/6 rounded" />
        </div>
        {/* Collapsed items */}
        {[36, 44, 44, 32].map((w, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
              <Skeleton className={`h-4 w-${w} sm:w-40 rounded`} />
            </div>
            <Skeleton className="h-4 w-4 shrink-0 rounded" />
          </div>
        ))}
        {/* Study Pattern */}
        <div className="border border-gray-100 rounded-xl p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 shrink-0 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
          <Skeleton className="h-4 w-4 shrink-0 rounded" />
        </div>
      </div>
    </div>
  );
}

// Right Panel: This Week
function ThisWeekSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-4 w-4 shrink-0 rounded" />
        <Skeleton className="h-5 w-20 rounded" />
      </div>
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-3 w-3 rounded-full mt-1 shrink-0" />
            <div className="space-y-1.5 flex-1 min-w-0">
              <Skeleton className="h-4 w-36 rounded" />
              <Skeleton className="h-3 w-full max-w-[11rem] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Export 
const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5">

        {/* Header */}
        <div className="space-y-1.5">
          <Skeleton className="h-7 sm:h-8 w-64 sm:w-80 rounded-md" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-3.5 rounded" />
            <Skeleton className="h-3.5 w-48 rounded" />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCardSkeleton accent="bg-blue-500" />
          <StatCardSkeleton accent="bg-purple-500" />
          <StatCardSkeleton accent="bg-emerald-600" />
          <StatCardSkeleton accent="bg-pink-500" />
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">

          {/* Left / Center (2/3 width) */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuickActionSkeleton />
              <QuickActionSkeleton />
            </div>

            {/* Performance Trend */}
            <PerformanceTrendSkeleton />

            {/* Bottom charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BarChartSkeleton />
              <RadarChartSkeleton />
            </div>
          </div>

          {/* Right panel (1/3 width) */}
          <div className="space-y-4">
            <SuggestionsSkeleton />
            <ThisWeekSkeleton />
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardSkeleton;