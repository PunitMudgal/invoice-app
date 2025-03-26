"use server";

import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema,  } from "./utils/zodSchemas";
import prisma from "./utils/prisma";
import { redirect } from "next/navigation";
import { formatCurrency } from "./utils/formatCurrency";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { emailClient } from "./utils/mailtrap";
import { toast } from "sonner";

export async function getInvoices(userId: string){
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export async function createInvoice(prevState: any, formData: FormData) {
  try{
  const user = await currentUser();

  if(!user){
    throw new Error("User not found!")
  }

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: user?.id,
    },
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Punit Sharma",
  };

  emailClient.send({
    from: sender,
    to: [{ email: submission.value.clientEmail|| "ssmudgal01@gmail.com" }],
    template_uuid: "713dbb2e-6299-4f6e-bbe3-1747236725db",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      invoiceAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink:
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000/api/invoice/${data.id}`
          : `https://invoice-app-roan-ten.vercel.app/api/invoice/${data.id}`,
    },
  });

  revalidatePath("/dashboard/invoices");
  return { success: true};
} catch (error) {
  console.error("Error creating invoice:", error);
  return { success: false};
}
}

export async function editInvoice(prevState: any, formData: FormData) {
  const user = await currentUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
    },
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Punit sharma",
  };

  emailClient.send({
    from: sender,
    to: [{ email: submission.value.clientEmail|| "ssmudgal01@gmail.com"  }],
    template_uuid: "ac5a924e-0404-4f30-a8b1-687f3d6d4be1",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      invoiceDueDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      invoiceAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink:
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000/api/invoice/${data.id}`
          : `https://invoice-marshal.vercel.app/api/invoice/${data.id}`,
    },
  });

  return redirect("/dashboard/invoices");
}


export async function DeleteInvoice(invoiceId: string) {
  const user = await currentUser();
  if (!user) {
    toast.error("Not authorized")
    throw new Error("User not authenticated");
  }

  // Check if invoice exists & belongs to the user
  const isAuthorized = await prisma.invoice.count({
    where: {
      id: invoiceId,
      userId: user.id,
    },
  });

  if (isAuthorized === 0) {
    toast.error("Not authorized")
    }

  await prisma.invoice.delete({
    where: {
      id: invoiceId,
    },
  });
  redirect("/dashboard/invoices")
}

export async function MarkAsPaidAction(invoiceId: string) {
  const user = await currentUser();

   await prisma.invoice.update({
    where: {
      userId: user?.id,
      id: invoiceId,
    },
    data: {
      status: "PAID",
    },
  });

  return redirect("/dashboard/invoices");
}
