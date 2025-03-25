import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingInvoiceList = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-[50px]" />
      <Skeleton className="w-full h-[50px]" />
      <Skeleton className="w-full h-[50px]" />
      <Skeleton className="w-full h-[50px]" />
    </div>
  );
};

export default LoadingInvoiceList;
