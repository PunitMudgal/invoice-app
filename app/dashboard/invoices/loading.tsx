import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 ">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-16 rounded-md" />
        <Skeleton className="h-10 w-64 rounded-md" />
      </div>

      {/* Invoice No and Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex">
            <Skeleton className="h-10 w-10 rounded-l-md" />
            <Skeleton className="h-10 w-full rounded-r-md" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* From and To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Date and Invoice Due */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-10 w-full rounded-md" />

        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="grid grid-cols-12 gap-4 items-start">
        <div className="col-span-6">
          <Skeleton className="h-24 w-full rounded-md" />
        </div>
        <div className="col-span-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="col-span-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="col-span-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      <Skeleton className="h-6 w-24 rounded-md" />
      <Skeleton className="h-6 w-24 rounded-md" />
    </div>
  );
};

export default Loading;
