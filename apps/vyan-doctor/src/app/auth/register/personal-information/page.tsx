import { getServerSession } from "next-auth"
import RegisterForm from "./register-form"
import { redirect } from "next/navigation"

const Register = async() => {
    const session = await getServerSession()
    if(session){
        redirect("/")
    }
    return(
        <>
        <RegisterForm/>
        </>
    )
}
export default Register