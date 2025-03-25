import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, IndianRupee, Users } from "lucide-react";
import prisma from "../utils/prisma";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
  const [
    totalRevenue,
    totalInvoicesCount,
    openInvoicesCount,
    paidInvoicesCount,
  ] = await Promise.all([
    // Calculate total revenue
    prisma.invoice.aggregate({
      where: { userId },
      _sum: { total: true },
    }),

    // Count all invoices
    prisma.invoice.count({
      where: { userId },
    }),

    // Count open invoices
    prisma.invoice.count({
      where: {
        userId,
        status: "PENDING",
      },
    }),

    // Count paid invoices
    prisma.invoice.count({
      where: {
        userId,
        status: "PAID",
      },
    }),
  ]);

  return {
    totalRevenue: totalRevenue._sum.total || 0,
    totalInvoices: totalInvoicesCount,
    openInvoicesCount,
    paidInvoicesCount,
  };
}
interface iAppProps {
  userId: string;
}

const DashboardBlocks = async ({ userId }: iAppProps) => {
  const { totalRevenue, totalInvoices, openInvoicesCount, paidInvoicesCount } =
    await getData(userId);

  const cards = [
    {
      title: "Total Revenue",
      icon: <IndianRupee className="size-4 text-muted-foreground" />,
      value: formatCurrency({ amount: totalRevenue, currency: "INR" }),
      description: "Based on total volume",
    },
    {
      title: "Total Invoices Issued",
      icon: <Users className="size-4 text-muted-foreground" />,
      value: `+${totalInvoices}`,
      description: "Total Invoices Issued!",
    },
    {
      title: "Paid Invoices",
      icon: <CreditCard className="size-4 text-muted-foreground" />,
      value: `+${paidInvoicesCount}`,
      description: "Total Invoices which have been paid!",
    },
    {
      title: "Pending Invoices",
      icon: <Activity className="size-4 text-muted-foreground" />,
      value: `+${openInvoicesCount}`,
      description: "Invoices which are currently pending!",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold">{card.value}</h2>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardBlocks;
