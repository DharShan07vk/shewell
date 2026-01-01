export { default } from "next-auth/middleware";
// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'
export const config = {
  matcher: [ "/appointment", "/edit-profile", "/auth/register/qualifications","/auth/register/modes","/auth/register/uploads", "/dashboard"],
};

 
// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone()
//   url.pathname = '/http://localhost:3002/api/google-meet-auth/callback'
//   return NextResponse.rewrite(url)
// }