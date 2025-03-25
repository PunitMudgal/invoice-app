import React, { Suspense } from "react";
import DashboardBlocks from "../components/DashboardBlocks";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Skeleton } from "@/components/ui/skeleton";
import RecentInvoices from "../components/RecentInvoices";
import InvoiceGraph from "../components/InvoiceGraph";
import EmptyState from "../components/EmptyState";
import prisma from "../utils/prisma";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return data;
}

const page = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const data = await getData(userId);

  return (
    <>
      <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
        <DashboardBlocks userId={userId} />
        <div className="grid gap-4 lg:grid-cols-3 md:gap-8 w-full ">
          {data.length < 1 ? (
            <div className="justify-center items-center">
              <EmptyState />
            </div>
          ) : (
            <>
              <InvoiceGraph userId={userId} />
              <RecentInvoices userId={userId} />
            </>
          )}
        </div>
      </Suspense>
    </>
  );
};

export default page;
