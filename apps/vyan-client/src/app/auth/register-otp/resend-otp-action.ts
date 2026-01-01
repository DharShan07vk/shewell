'use server'
import { sendEmail } from "@repo/mail";
import { getServerSession } from "next-auth";
import { generateOtp } from "~/lib/utils";
import { db } from "~/server/db";

const resendOTP = async () => {
    const session = await getServerSession();
    try {
        const user = await db.user.findFirst({
            where: {
                email: session?.user.email!,
            },
        });
        if (!user) {
            return
        }
        const otp = generateOtp();
        await db.user.update({
            data: {
                otp: otp,
            },
            where: {
                email: user?.email!,
            },
        });
        const emailBodySendGrid = {
            from: process.env.FROM_EMAIL!,
            subject: "Verification OTP",
            to: [user.email],
            html: `<p>Hi,<strong> ${user.name} <br/> </strong/></p>
        <span>This is your verification OTP ${otp}<span/>
        `,

        };

        await sendEmail(emailBodySendGrid);

        return {
            message: "OTP has been sent to your registered mail"
        }
    }
    catch (error) {
        console.log("resend-otp", error);
        throw new Error("OTP cannot be resend")
    }
};
export default resendOTP;
