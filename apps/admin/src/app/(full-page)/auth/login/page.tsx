/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useState } from 'react';

import { Button } from 'primereact/button';

import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useForm, Controller } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const error = searchParams?.get('error');

  let errorMessage: string | undefined;
  if (error && error === 'CredentialsSignin') {
    errorMessage = 'Invalid email or password';
  }
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const router = useRouter();
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden p-input-filled');

  const loginSubmit = ({ username, password }: { username: string; password: string }) => {
    setIsLoading(true);
    signIn('credentials', { username, password, callbackUrl: '/' }).then(
      (success) => {
        setIsLoading(false);
        router.push('/');
      },
      (err) => {
        setIsLoading(false);
      }
    );
  };

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <img src={`/layout/images/vyan-logo.png`} alt="Flexit Logo" className="mb-5 w-12rem flex-shrink-0" />
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
              <span className="text-600 font-medium">Sign in to continue</span>
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

              <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
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
              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <Link href="/auth/forget-password" className="font-medium no-underline text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" loading={isLoading} label="Sign In" className="w-full p-3 text-xl" style={{ minWidth: 250 }}></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
