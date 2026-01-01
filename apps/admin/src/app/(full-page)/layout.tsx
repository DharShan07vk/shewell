import { Metadata } from 'next';
import AppConfig from '../../layout/AppConfig';
import React from 'react';
import { getServerAuthSession } from '@/src/server/auth';
import { redirect } from 'next/navigation';

interface SimpleLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Shewell Admin',
  description: 'Admin panel for Shewell web and mobile app.',
  // openGraph: {
  //   type: 'website',
  //   title: 'Flexit Admin',
  //   url: 'https://sakai.primereact.org/',
  //   description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
  //   images: ['https://www.primefaces.org/static/social/sakai-react.png'],
  //   ttl: 604800
  // },
  icons: {
    icon: '/favicon.ico'
    // icon: '/'
  }
};

const SimpleLayout = async ({ children }: SimpleLayoutProps) => {
  const session = await getServerAuthSession();

  if (session) {
    console.log('session is present???????');
    redirect('/');
  }

  return (
    <React.Fragment>
      {children}
      <AppConfig simple />
    </React.Fragment>
  );
};

export default SimpleLayout;
