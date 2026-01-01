/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { Toast } from 'primereact/toast';
import resetPasswordAction from './reset-password-action';

const ForgetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useRef<Toast>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = searchParams?.get('resetPasswordToken') || '';
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden p-input-filled');

  const resetPasswordSubmit = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => {
    setIsLoading(true);
    resetPasswordAction({ token, password, confirmPassword }).then(
      (resp) => {
        setIsLoading(false);
        if (resp.success) {
          reset();
          toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: resp.message
          });
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        } else {
          toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: resp.message
          });
        }
      },
      (err) => {
        setIsLoading(false);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: err.message
        });
      }
    );
  };

  return (
    <div className={containerClassName}>
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center justify-content-center">
        <img src={`/layout/images/logo.svg`} alt="Flexit Logo" className="mb-5 w-6rem flex-shrink-0" />
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
        >
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div className="text-center mb-5">
              <span className="text-600 font-medium">Reset Password</span>
            </div>
            <form onSubmit={handleSubmit(resetPasswordSubmit)}>
              <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Password is required.'
                  }
                }}
                render={({ field, fieldState }) => {
                  return (
                    <div className="w-full mb-5">
                      <Password feedback={false} placeholder="Password" toggleMask className="w-full" inputClassName="w-full p-3" {...field}></Password>
                      {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                    </div>
                  );
                }}
              />

              <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Confirm Password is required.'
                  },
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Your passwords do no match';
                    }
                  }
                }}
                render={({ field, fieldState }) => {
                  return (
                    <div className="w-full mb-5">
                      <Password feedback={false} placeholder="Password" toggleMask className="w-full" inputClassName="w-full p-3" {...field}></Password>
                      {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                    </div>
                  );
                }}
              />
              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <Link href="/auth/login" className="font-medium no-underline text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                  Remember Password. Login?
                </Link>
              </div>
              <Button type="submit" loading={isLoading} label="Change Password" className="w-full p-3 text-xl"></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
