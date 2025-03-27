import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Graph from "./Graph";
import prisma from "../utils/prisma";

async function getInvoices(userId: string) {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);
  thirtyDaysAgo.setUTCHours(0, 0, 0, 0);
  now.setUTCHours(23, 59, 59, 999);

  const rawData = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      userId: userId,
      createdAt: {
        lte: now,
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Group and aggregate data by date
  const aggregatedData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const dateObj = new Date(curr.createdAt);
      const dateKey = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD

      acc[dateKey] = (acc[dateKey] || 0) + (curr.total ?? 0);
      return acc;
    },
    {}
  );

  // Convert to sorted array
  const transformedData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));

  return transformedData;
}

interface iAppProps {
  userId: string;
}

const InvoiceGraph = async ({ userId }: iAppProps) => {
  const data = await getInvoices(userId);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph data={data} />
      </CardContent>
    </Card>
  );
};

export default InvoiceGraph;
