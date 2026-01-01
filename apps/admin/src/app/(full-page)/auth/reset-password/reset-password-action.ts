'use server';

import { db } from '@/src/server/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IResetPasswordActionProps {
  token: string;
  password: string;
  confirmPassword: string;
}

const resetPasswordAction = async ({ token, password, confirmPassword }: IResetPasswordActionProps) => {
  try {
    const decoded = jwt.verify(token, process.env.EMAIL_JWT_SECRET!) as {
      email: string;
    };
    console.log('decoded jwt', decoded);
    const user = await db.adminUser.findFirst({
      where: {
        email: decoded.email
      }
    });
    if (!user) {
      return {
        success: false,
        message: 'Your link has expired and no longer usable.'
      };
    }
    if (password !== confirmPassword) {
      return {
        success: false,
        message: 'Passwords do not match'
      };
    }

    if (password.trim().length < 8) {
      return {
        success: false,
        message: 'Password must be at least 8 characters long'
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.adminUser.update({
      where: {
        id: user.id
      },
      data: {
        passwordHash: hashedPassword
      }
    });
    return {
      success: true,
      message: 'Password reset successfully'
    };
  } catch (error) {
    console.log('decoded jwt', error);
    return {
      success: false,
      message: 'Your link has expired and no longer usable.'
    };
  }
};

export default resetPasswordAction;
