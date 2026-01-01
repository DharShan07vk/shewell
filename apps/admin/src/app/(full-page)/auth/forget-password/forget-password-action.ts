'use server';

import { db } from '@/src/server/db';
// import { sendEmail } from '@repo/mail';
import jwt from 'jsonwebtoken';

interface IForgetPasswordActionProps {
  email: string;
}

const forgetPasswordAction = async ({ email }: IForgetPasswordActionProps) => {
  const user = await db.adminUser.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive'
      }
    }
  });
  if (user) {
    // Generate reset password token
    const token = jwt.sign({ email: user.email }, process.env.EMAIL_JWT_SECRET!, {
      expiresIn: '4h'
    });
    const link = `${process.env.NEXTAUTH_URL}/auth/reset-password?resetPasswordToken=${token}`;
    const emailBodySendGrid = {
      from: process.env.FROM_EMAIL!,
      subject: 'Reset password instructions!',
      to: [user.email],
      html: `<p>Hi,<strong> ${user.name}</strong><br/></p>
             <span>Here is the link to reset your password.</span><br/>
             <a href="${link}">${link}</a>
             <p>This is valid for next 4 hours.</p>
             <strong>Team Flexit Fintness!</strong>`
    };
    console.log('link', link);
    // await sendEmail(emailBodySendGrid);
  }

  return {
    message: 'Reset password instructions sent to your email'
  };
};

export default forgetPasswordAction;
