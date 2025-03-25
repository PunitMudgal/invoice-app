import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import InvoiceMenuActions from "./InvoiceMenuActions";
import prisma from "../utils/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { getInvoices } from "../actions";
import { formatCurrency } from "../utils/formatCurrency";
import { Badge } from "@/components/ui/badge";
import EmptyState from "./EmptyState";

// async function getData(userId: string) {
//   const data = await prisma.invoice.findMany({
//     where: {
//       userId: userId,
//     },
//     select: {
//       id: true,
//       clientName: true,
//       total: true,
//       createdAt: true,
//       status: true,
//       invoiceNumber: true,
//       currency: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return data;
// }

const InvoiceList = async () => {
  const user = await currentUser();

  const data = await getInvoices(user?.id as string);

  return (
    <>
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>#{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.clientName}</TableCell>
                <TableCell>
                  {formatCurrency({
                    amount: invoice.total,
                    currency: invoice.currency as any,
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invoice.status === "PAID" ? "secondary" : "default"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                  }).format(invoice.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <InvoiceMenuActions id={invoice.id} status={invoice.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default InvoiceList;
