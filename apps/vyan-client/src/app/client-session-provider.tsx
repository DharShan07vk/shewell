"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { redirect, usePathname,useSearchParams} from "next/navigation";

const ClientSessionProvider = ({
  session,
  children,
  verifiedAt
}: {
  session: Session | null;
  children: ReactNode;
  verifiedAt : Date
}) => {

  const pathname = usePathname()


  if (verifiedAt === null  && pathname !== `/auth/register-otp` ) {
   
    redirect('/auth/register-otp')
  }
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ClientSessionProvider;
