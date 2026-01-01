import { db } from "~/server/db"
import ModesForm from "./modes-form"
import { getServerSession } from "next-auth"

const Modes = async() => {
    const session = await getServerSession()
    if(!session){
        throw new Error("Unauthorised")
    }
    if(!session.user.email){
        throw new Error("Unauthorised")
      }
    const professionalUser = await db.professionalUser.findFirst({
        where : {
            email : session.user.email
        }
    })
    return(
        <>
        <ModesForm sessionMode={professionalUser?.sessionMode!}  listing={professionalUser?.listing!}/>
        </>
    )
}
export default Modes