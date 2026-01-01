
import { db } from "~/server/db";
import RegisterOTPForm from "./verify-otp-form";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import VerifyOTPForm from "./verify-otp-form";

const RegisterOTP = async() => {
  const session = await getServerSession()
  const user = await db.user.findFirst({
    select : {
      verifiedAt : true
    },
    where : {
      email : session?.user.email!
    }
  })
  return (
    <>
      <VerifyOTPForm verifiedAt={user?.verifiedAt!} />
    </>
  );
};
export default RegisterOTP;
