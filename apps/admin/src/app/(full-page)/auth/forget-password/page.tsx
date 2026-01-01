/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import forgetPasswordAction from './forget-password-action';
import { Toast } from 'primereact/toast';

const ForgetPasswordPage = () => {
  const searchParams = useSearchParams();
  const toast = useRef<Toast>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const error = searchParams?.get('error');

  let errorMessage: string | undefined;
  if (error && error === 'CredentialsSignin') {
    errorMessage = 'Invalid email or password';
  }
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: ''
    }
  });

  const router = useRouter();
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden p-input-filled');

  const loginSubmit = ({ username }: { username: string }) => {
    setIsLoading(true);
    forgetPasswordAction({ email: username }).then(
      (success) => {
        setIsLoading(false);
        reset();
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: success.message
        });
        // router.push('/');
      },
      (err) => {
        setIsLoading(false);
        toast.current?.show({
          severity: 'error',
          summary: 'Success',
          detail: err.message
        });
        console.log(err);
        alert('error');
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
              {/*<img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />*/}
              {/*<div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>*/}
              <span className="text-600 font-medium">Forget Password</span>
            </div>
            <form onSubmit={handleSubmit(loginSubmit)}>
              {errorMessage && (
                <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
                  {/*<strong className="font-bold">Error!</strong>*/}
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}
              <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                Email
              </label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Email is required.'
                  }
                }}
                render={({ field, fieldState }) => {
                  return (
                    <div className="w-full mb-5">
                      <InputText type="email" placeholder="Email address" className="w-full" style={{ padding: '1rem' }} {...field} />
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
              <Button type="submit" label="Send Forget Password Instructions" className="w-full p-3 text-xl"></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
