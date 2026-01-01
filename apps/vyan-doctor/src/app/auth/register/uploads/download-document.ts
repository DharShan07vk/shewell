"use server";

import { getPrivateFileUrl } from "@repo/aws";

const downloadDocument = async ({
  fileKey,
}: {
  fileKey: string;
}): Promise<string | null> => {
  try {
    const url = await getPrivateFileUrl(fileKey);

    return url!;
  } catch (error) {
    console.log("downloadurl", error);
    return null;
  }
};
export default downloadDocument;
