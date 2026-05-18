import { Skeleton } from "@/components/ui/skeleton";

function ProfileCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm">
      {/* Avatar */}
      <Skeleton className="h-16 w-16 rounded-full shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        {/* Name */}
        <Skeleton className="h-6 w-40 rounded-md" />
        {/* Email */}
        <Skeleton className="h-4 w-48 rounded-md" />
        {/* Badges */}
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-6 w-44 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function PersonalInfoSkeleton() {
  const fields = [
    { label: "Full name", width: "w-28" },
    { label: "Email address", width: "w-32" },
    { label: "School", width: "w-16" },
    { label: "Program type", width: "w-28" },
    { label: "Expected graduation", width: "w-40" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-6 pb-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-44 rounded-md" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>
        {/* Edit button */}
        <Skeleton className="h-10 w-28 rounded-full" />
      </div>

      <div className="border-t border-gray-100" />

      {/* Fields */}
      <div className="divide-y divide-gray-100">
        {fields.map(({ label, width }) => (
          <div key={label} className="flex items-center px-6 py-5 gap-8">
            <Skeleton className={`h-4 ${width} rounded-md shrink-0`} />
            <Skeleton className="h-10 flex-1 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

const LoadingState = () => {
  return (
    <div
      className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Page title */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-36 rounded-md bg-gray-300/60" />
          <Skeleton className="h-4 w-72 rounded-md bg-gray-300/50" />
        </div>

        <ProfileCardSkeleton />
        <PersonalInfoSkeleton />
      </div>
    </div>
  );
}

export default LoadingState;