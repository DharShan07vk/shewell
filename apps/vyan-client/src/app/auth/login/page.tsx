'use client'
import { useRouter, useSearchParams } from "next/navigation"
import LoginForm from "./login-form"
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const {data : session} = useSession()
  const searchParams = useSearchParams()
  useEffect(() => {
    if (session) {
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    }
  }, [session, router,searchParams]);
  return(
    <>
    <LoginForm/>
    </>
  )
}
export default Login