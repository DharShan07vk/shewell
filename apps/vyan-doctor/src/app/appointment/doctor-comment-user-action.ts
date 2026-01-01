"use server"

import { db } from "~/server/db"
interface ICommentProps{
    comments : string,
    bookAppointmentId : string

}
const DoctorCommentUserAction = async({comments, bookAppointmentId} : ICommentProps) => {

  try{
    const comment = await db.comment.create({
        data : {
            comment : comments,
            bookAppointmentId : bookAppointmentId
        }
       })
       return{
        message : "Comment has created"
       }
  }
  catch(error){
    console.log("error", error)
    throw new Error("Comment has not created")
  }
}

export default DoctorCommentUserAction