import {
  S3,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectRequest, ObjectCannedACL
} from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { addSeconds } from 'date-fns/addSeconds';

const s3 = new S3({
  // forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  // endpoint: process.env.S3_SPACES_URL!,
  region: process.env.AWS_REGION!,
  // region: process.env.S3_UPLOAD_REGION! || "blr1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const getUploadPresignedUrl = async (key: string, isPublic: boolean) => {
  // console.log('AWS_REGION', process.env.AWS_REGION!)
  // console.log('AWS_ACCESS_KEY_ID', process.env.AWS_ACCESS_KEY_ID!)
  // console.log('AWS_SECRET_ACCESS_KEY', process.env.AWS_SECRET_ACCESS_KEY!)
  // console.log('AWS_BUCKET', process.env.AWS_BUCKET!)
  const fileParams = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ContentType: "text",
    Expires: addSeconds(new Date(), 600),
    ACL: isPublic ? ObjectCannedACL.public_read : ObjectCannedACL.private,
  };
  // try {
    const command = new PutObjectCommand(fileParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 10 * 60 });
    // console.log(url);
    return url;
  // } catch (err) {
  //   console.log(err);
  //   return;
  // }
};

export const getPublicFileUrl = (key: string) => {
  const imageUrl = `https://${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com/${key}`;
  if (!imageUrl) {
    throw Error("Image not Found");
  }
};

export const getPrivateFileUrl = async (key: string) => {
  const fileParams = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
  };
  try {
    // console.log("Bucket check",process.env.AWS_BUCKET)
    const command = new GetObjectCommand(fileParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 10 * 60 });
    return url;
  } catch (err) {
    console.log('BUCKET',err, key, process.env.AWS_REGION, process.env.AWS_BUCKET);
    return;
  }
};

export const deleteS3File = async (key: string) => {
  let fileParams: DeleteObjectRequest;
  if (process.env.S3_UPLOAD_BUCKET) {
    fileParams = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: key,
    };
    s3.deleteObject(fileParams, (err, data) => {
      if (err) {
        return { success: false, message: err.message };
      } else {
        return { success: true, message: "Deleted file successfully." };
      }
    });
  }
};

export const makePublic = async (key: string) => {
  try {
    return s3.putObjectAcl({
      Bucket: process.env.S3_UPLOAD_BUCKET!,
      Key: key,
      ACL: "public-read",
    });
  } catch (e) {
    // console.log(e);
  }
};
