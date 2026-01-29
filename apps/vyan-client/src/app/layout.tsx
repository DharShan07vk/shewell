import { getServerSession } from "next-auth";
import "~/styles/globals.css";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "@repo/ui/src/@/components/toaster";
import { db } from "~/server/db";
import { Header } from "~/components/header";
import NewFooter from "~/components/new-footer";
import ClientSessionProvider from "./client-session-provider";
import CardSheet from "~/components/card-sheet";
import { TRPCReactProvider } from "~/trpc/react";

// PERFORMANCE: Reduced from 5 fonts to 2 essential ones with display:swap
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Shewell - Empowering Women, Nurturing Families",
  description: "A trusted digital companion for women's health, motherhood, mental wellbeing, and mindful living curated by experts",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  
  // PERFORMANCE: Only fetch verifiedAt for authenticated users to avoid unnecessary DB queries
  let verifiedAt: Date | null = null;
  if (session?.user?.email) {
    const user = await db.user.findFirst({
      select: { verifiedAt: true },
      where: { email: session.user.email },
    });
    verifiedAt = user?.verifiedAt ?? null;
  }

  return (
    <html className={`scroll-smooth ${poppins.variable} ${inter.variable}`} lang="en">
      <body className="relative font-sans">
        <div className="sticky top-0 z-40">
          <ClientSessionProvider session={session} verifiedAt={verifiedAt}>
            <TRPCReactProvider>
              <Header />
              {children}
              <NewFooter />
              <Toaster />
              <CardSheet />
            </TRPCReactProvider>
          </ClientSessionProvider>
        </div>

        {/* <div className="">
          <ClientSessionProvider session={session} verifiedAt={verifiedAt!}>
            <TRPCReactProvider>{children} </TRPCReactProvider>
          </ClientSessionProvider>
        </div> */}
        {/* <Footer />
        <Toaster />
        <CardSheet /> */}
      </body>
    </html>
  );
}
