import { Skeleton } from "@/components/ui/skeleton";

function ProfileCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 shadow-sm">
      {/* Avatar */}
      <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-full shrink-0" />
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {/* Name */}
        <Skeleton className="h-5 sm:h-6 w-36 sm:w-40 rounded-md" />
        {/* Email */}
        <Skeleton className="h-3.5 sm:h-4 w-40 sm:w-48 rounded-md" />
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-1">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-6 w-36 sm:w-44 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function PersonalInfoSkeleton() {
  const fields = [
    { label: "Full name", labelWidth: "w-20 sm:w-28", inputWidth: "w-32 sm:flex-1" },
    { label: "Email address", labelWidth: "w-24 sm:w-32", inputWidth: "w-40 sm:flex-1" },
    { label: "School", labelWidth: "w-12 sm:w-16", inputWidth: "w-44 sm:flex-1" },
    { label: "Program type", labelWidth: "w-20 sm:w-28", inputWidth: "w-28 sm:flex-1" },
    { label: "Expected graduation", labelWidth: "w-32 sm:w-40", inputWidth: "w-24 sm:flex-1" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-4 sm:p-6 pb-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-36 sm:w-44 rounded-md" />
          <Skeleton className="h-4 w-48 sm:w-64 rounded-md" />
        </div>
        {/* Edit button */}
        <Skeleton className="hidden sm:block h-10 w-28 rounded-full shrink-0" />
      </div>

      <div className="border-t border-gray-100" />

      {/* Fields */}
      <div className="divide-y divide-gray-100">
        {fields.map(({ label, labelWidth, inputWidth }) => (
          <div key={label} className="flex items-center px-4 sm:px-6 py-4 sm:py-5 gap-4 sm:gap-8">
            <Skeleton className={`h-4 ${labelWidth} rounded-md shrink-0`} />
            <Skeleton className={`h-9 sm:h-10 ${inputWidth} rounded-lg`} />
          </div>
        ))}
      </div>
    </div>
  );
}

const LoadingState = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-3xl mx-auto w-full space-y-4 sm:space-y-6">
        {/* Page title */}
        <div className="space-y-2">
          <Skeleton className="h-7 sm:h-8 w-32 sm:w-36 rounded-md" />
          <Skeleton className="h-4 w-56 sm:w-72 rounded-md" />
        </div>

        <ProfileCardSkeleton />
        <PersonalInfoSkeleton />
      </div>
    </div>
  );
};

export default LoadingState;