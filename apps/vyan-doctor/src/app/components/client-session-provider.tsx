"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

const ClientSessionProvider = ({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ClientSessionProvider;
