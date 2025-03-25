import { emailClient } from "@/app/utils/mailtrap";
import prisma from "@/app/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST (request: Request, {params,}: {params: Promise<{invoiceId: string}>}){
    try {
        const { userId } = await auth();

        if (!userId) {
            redirect("/login");
        }

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({where: {
        id: invoiceId,
        userId //
    }})
    if(!invoiceData){
        return NextResponse.json({error: "Invoice Not found!"}, {status: 404})
    }

    const sender  = {
        email: "hello@demomailtrap.com",
        name: "Punit Sharma",
    }

    emailClient.send({
        from: sender,
        to: [{ email:  invoiceData.clientEmail }],
        template_uuid: "65babce9-6a7e-4228-8d76-503fdc488938",
        template_variables: {
          first_name: invoiceData.clientName,
          company_info_name: "InvoicePulse",
          company_info_address: "Chad street 124",
          company_info_city: "Munich",
          company_info_zip_code: "122122",
          company_info_country: "India",
        },
      });
      
      return NextResponse.json({ success: true });

    }  catch (error) {
        return NextResponse.json(
          { error: "Failed to send Email reminder" },
          { status: 500 }
        );
      }
}