import { Skeleton } from "@/components/ui/skeleton";

// ── Patient Info Card
function PatientInfoSkeleton() {
  const vitals = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      {/* Vitals row */}
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {vitals.map((i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-12 rounded" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100" />

      {/* Labeled fields */}
      <div className="space-y-4">
        {[
          { labelW: "w-28", valueW: "w-64 sm:w-80" },
          { labelW: "w-36", valueW: "w-8"  },
          { labelW: "w-28", valueW: "w-8"  },
          { labelW: "w-36", valueW: "w-8"  },
          { labelW: "w-16", valueW: "w-8"  },
          { labelW: "w-20", valueW: "w-8"  },
        ].map(({ labelW, valueW }, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton className={`h-3 ${labelW} rounded`} />
            <Skeleton className={`h-4 ${valueW} rounded`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Diagnosis Block
function DiagnosisBlockSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Priority header */}
      <div className="px-5 sm:px-6 pt-5 pb-4 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-8 rounded-md" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-6 w-48 sm:w-64 rounded-md" />
        {/* Long italic description */}
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-5/6 rounded" />
        </div>
      </div>

      {/* Defining Characteristics + Related Factors */}
      <div className="border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
        {/* Left */}
        <div className="px-5 sm:px-6 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full shrink-0" />
            <Skeleton className="h-3.5 w-40 rounded" />
          </div>
          <div className="space-y-2 pl-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="h-2 w-2 rounded-full mt-1.5 shrink-0" />
                <Skeleton className={`h-3.5 rounded ${i === 1 ? "w-52 sm:w-64" : i === 2 ? "w-44 sm:w-52" : "w-56 sm:w-72"}`} />
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="px-5 sm:px-6 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded shrink-0" />
            <Skeleton className="h-3.5 w-32 rounded" />
          </div>
          <div className="space-y-2 pl-1">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="h-2 w-2 rounded-full mt-1.5 shrink-0" />
                <Skeleton className={`h-3.5 rounded ${i === 1 ? "w-36" : "w-44"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expected Outcomes / Goals */}
      <div className="border-t border-gray-100 px-5 sm:px-6 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full shrink-0" />
          <Skeleton className="h-3.5 w-44 rounded" />
        </div>
        {/* Table header */}
        <div className="flex gap-6 px-1">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
        {/* Table rows */}
        {[1, 2].map((i) => (
          <div key={i} className="flex items-start gap-4 sm:gap-6 px-1">
            <div className="flex items-center gap-1.5 shrink-0">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-3.5 w-16 rounded" />
            </div>
            <Skeleton className="h-3.5 flex-1 max-w-[28rem] rounded" />
          </div>
        ))}
      </div>

      {/* Nursing Interventions header */}
      <div className="border-t border-gray-100 px-5 sm:px-6 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded shrink-0" />
          <Skeleton className="h-3.5 w-52 rounded" />
        </div>
        {/* Table column headers */}
        <div className="flex gap-4 px-1">
          <Skeleton className="h-3 w-4 rounded" />
          <Skeleton className="h-3 w-36 rounded" />
          <Skeleton className="h-3 w-32 rounded ml-auto" />
        </div>
      </div>
    </div>
  );
}

// ── Main Export
const CarePlanDetailSkeleton = () => {
  return (
    <div
      className="min-h-screen">
      <div className="space-y-5 sm:space-y-6">

        {/* Page header */}
        <div className="md:flex items-start justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <Skeleton className="h-7 sm:h-9 w-44 sm:w-56 rounded-md" />
            <Skeleton className="h-4 w-full max-w-xs sm:max-w-md rounded" />
          </div>
          <div className="flex items-center gap-3 shrink-0 max-md:mt-4">
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </div>

        {/* Patient info card */}
        <PatientInfoSkeleton />

        {/* AI-Powered Diagnoses section */}
        <div className="space-y-2">
          <Skeleton className="h-6 sm:h-7 w-44 sm:w-52 rounded-md" />
          <Skeleton className="h-4 w-full max-w-xs sm:max-w-sm rounded" />
        </div>

        {/* Diagnosis block */}
        <DiagnosisBlockSkeleton />

      </div>
    </div>
  );
}

export default CarePlanDetailSkeleton;