import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // ✅ Verify webhook with Clerk
    const evt = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_SIGNING_SECRET!,
    });

    const { type: eventType, data } = evt;

    if (!eventType || !data) {
      console.error("Invalid webhook payload:", evt);
      return new Response("Invalid webhook event", { status: 400 });
    }

    if (eventType === "user.created") {
      await db.insert(users).values({
        clerkId: data.id,
        name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
        imageUrl: data.image_url ?? "",
      });
    }

    if (eventType === "user.updated") {
      await db
        .update(users)
        .set({
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          imageUrl: data.image_url ?? "",
        })
        .where(eq(users.clerkId, data.id));
    }

    if (eventType === "user.deleted") {
      if (!data.id) return new Response("Missing user id", { status: 400 });
      await db.delete(users).where(eq(users.clerkId, data.id));
    }

    console.log(`✅ Webhook processed: ${eventType}`);
    return new Response(`Processed ${eventType}`, { status: 200 });
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
