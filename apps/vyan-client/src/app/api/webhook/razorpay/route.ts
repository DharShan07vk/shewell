import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "~/server/db";
import { OrderStatus } from "@repo/database";

const getRawBody = async (req: NextRequest): Promise<string> => {
  const readableStream = req.body;
  const chunks: Uint8Array[] = [];
  const reader = readableStream?.getReader();
  if (!reader) throw new Error("Could not read the request body");
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const rawBody = Buffer.concat(chunks).toString();
  return rawBody;
};

export const POST = async (req: NextRequest) => {
  console.log("going inside the post request");
  try {
    // Parse the incoming request body
    const rawBody = await getRawBody(req);
    const body = JSON.parse(rawBody); 
    console.log("body is", body);

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Razorpay sends headers with the signature
    const razorpaySignature = req.headers.get("x-razorpay-signature") || "";

    console.log("razorpaySignature is", razorpaySignature);
    // Recreate the signature using the body and your webhook secret
    const generatedSignature = crypto
      .createHmac("sha256", webhookSecret as string)
      .update(JSON.stringify(body))
      .digest("hex");

    console.log(
      "generatedSignature using body and secretkey is",
      generatedSignature,
    );

    if (generatedSignature === razorpaySignature) {
      console.log("Received event:", body.event);

      if (body.event === "payment.captured") {
        const paymentData = body.payload.payment.entity;
        console.log("Payment Captured:", paymentData);
        const orderF = await db.order.findFirst({
          where: {
            razorpay_order_id: paymentData.order_id,
          },
        });

        if (!orderF) {
          console.log("order not found for this razorpay order id");
        }
        try {
          await db.order.updateMany({
            where: {
              razorpay_order_id: paymentData.order_id,
            },
            data: {
              status: OrderStatus.PAYMENT_SUCCESSFUL,
            },
          });
          console.log("Payment status updated successfully");
          return NextResponse.json({ status: "ok" }, { status: 200 });
        } catch (err) {
          console.log("error");
          return NextResponse.json({ status: "error" }, { status: 422 });
        }
      }
      console.log("returning message on success");
      return NextResponse.json({ status: "ok" }, { status: 200 });
    } 
    else {
      // Invalid signature
      console.error("Invalid signature!");
      return NextResponse.json(
        { status: "invalid signature" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
};
