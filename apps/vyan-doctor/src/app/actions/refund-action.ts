import { getServerSession } from "next-auth";
import Razorpay from "razorpay";
import { db } from "~/server/db";

// Function to initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const processRefund = async (paymentId: string, amount: number, appointmentId : string) => {
  try {
    const refund = await razorpayInstance.payments.refund(paymentId, {
      amount: amount.toString(),
      speed: "normal",
      // notes: {
      //   notes_key_1: "Optional Note 1",
      //   notes_key_2: "Optional Note 2",
      // },
      //   receipt: "Receipt No. 32",
    });
    console.log("refundIdId", refund.id);

    // const session = await getServerSession();
    // const professionalUser = await db.professionalUser.findFirst({
    //   where: {
    //     email: session?.user.email!,
    //   },
    // });
    // const appointment = await db.bookAppointment.findFirst({
    //   where: {
    //     professionalUserId: professionalUser?.id!,
    //   },
    // });
    // console.log(" appointment?.id", appointment?.id);
    // console.log("razorpayPaymentIddoctor", paymentId);
    await db.bookAppointment.update({
      data: {
        razorpayRefundId: refund.id,
      },
      where: {
        id: appointmentId
        // razorpayPaymentId: paymentId,
      },
    });
    return {
      refund,
    };
  } catch (error) {
    console.error("Refund Error:", error);
    throw new Error("Refund process failed");
  }
};
