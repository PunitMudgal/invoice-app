import EditInvoice from "@/app/components/EditInvoice";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/app/utils/prisma";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    notFound();
  }

  return data;
}

type Params = {
  invoiceId: string;
};

const EditInvoiceRoute = async ({ params }: { params: Params }) => {
  const { invoiceId } = params;
  const { userId } = await auth();
  if (!userId) {
    notFound();
  }
  const data = await getData(invoiceId, userId);

  return <EditInvoice data={data} />;
};

export default EditInvoiceRoute;
