import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, UserJSON } from "@clerk/nextjs/server";
import prisma from "@/app/utils/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env.local"
    );
  }

  // Create new Svix instance
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", { status: 400 });
  }

  // Type assertion: Ensure we are handling user events only
  if (!("data" in evt) || !evt.data || evt.object !== "event") {
    console.error("Invalid event data received");
    return new Response("Invalid event data", { status: 400 });
  }

  const userData = evt.data as UserJSON; // Explicitly define user type
  const { id, primary_email_address_id, first_name, last_name, email_addresses } = userData;

  // Find the user's primary email
  const email = email_addresses.find((email) => email.id === primary_email_address_id)?.email_address || null;

  try {
    switch (evt.type) {
      case "user.created":
        await prisma.user.create({
          data: {
            clerkId: id,
            email: email,
            firstName: first_name,
            lastName: last_name,
          },
        });
        break;

      case "user.updated":
        await prisma.user.update({
          where: { clerkId: id },
          data: {
            email: email,
            firstName: first_name,
            lastName: last_name,
          },
        });
        break;

      case "user.deleted":
        await prisma.user.delete({
          where: { clerkId: id },
        });
        break;

      default:
        console.log(`Unhandled event type: ${evt.type}`);
    }
  } catch (error) {
    console.error("Database update failed:", error);
    return new Response("Database update error", { status: 500 });
  }

  return new Response("Webhook processed", { status: 200 });
}
