import { db } from "~/server/db";
import UploadForm from "./upload-form";
import { getServerSession } from "next-auth";
import React from "react";
import { DocumentType } from "@repo/database";
const Upload = async () => {
  const session = await getServerSession();
  if(!session){
    return
  }
  if(!session.user.email){
    return
  }

  const aadharCard =  await db.professionalUser.findFirst({

    select : {
     documents :{
      select : {
        id : true,
        fileKey : true
      },
      where: {
        type : DocumentType.AADHAR_CARD
      }
     }
    },
    where : {
      email : session.user.email
    }
  })

  const panCard = await db.professionalUser.findFirst({
    select : {
     documents : {
      select : {
        id : true,
        fileKey : true
      },
      where : {
        type : DocumentType.PAN_CARD
      }
     }
    },
    where : {
      email : session.user.email
    }
  })
  const professionalUser = await db.professionalUser.findFirst({
    select: {
      media: {
        select: {
          fileUrl: true,
        },
      },
      documents:{
        select:{
          id : true,
          fileKey: true,
         
        },
        where:{
          type : DocumentType.OTHER_DOCUMENTS
        }
      },
      mediaId: true,
      id: true,
      aboutYou : true
    },
    where: {
      email: session.user.email,
    },
  });
  if (!professionalUser) {
    return;
  }


  console.log("professionalUser.documents", professionalUser);
  return (
    <>
      <UploadForm
        fileUrl={professionalUser.media?.fileUrl!}
        mediaId={professionalUser.mediaId}
        professionalUserId={professionalUser.id}
        aboutYou={professionalUser.aboutYou!}
        documents={professionalUser.documents}
        aadharCard={aadharCard?.documents[0]}
        panCard={panCard?.documents[0]}
      />
    </>
  );
};
export default Upload;
