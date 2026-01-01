import { Metadata } from 'next';
import Layout from '../../layout/layout';
import { Suspense } from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const viewport = {
  initialScale: 1,
  width: 'device-width'
};

export const metadata: Metadata = {
  title: 'Shewell Admin',
  description: 'Admin panel for Shewell web and mobile app.',
  robots: { index: false, follow: false },
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
  }
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <Layout>
    <Suspense>
    {children}
    </Suspense>
  </Layout>;
}
