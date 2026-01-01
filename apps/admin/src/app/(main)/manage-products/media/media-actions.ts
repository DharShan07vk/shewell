'use server';

import { db } from '@/src/server/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { IMedia } from '@/src/_models/media.model';

export const createMedia = async (data: IMedia) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { fileKey, fileUrl, comments, mimeType } = data;

  const FormData = z.object({
    fileKey: z.string(),
    fileUrl: z.string().nullable(),
    mimeType: z.string().nullable(),
    comments: z.string().nullable()
  });

  const isValidData = FormData.parse({
    fileKey,
    fileUrl,
    comments,
    mimeType
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  await db.media.create({
    data: {
      fileKey,
      fileUrl,
      comments: comments!,
      mimeType: mimeType!
    }
  });

  revalidatePath('/admin/media');
  return {
    message: 'Media created successfully'
  };
};

export const updateMedia = async (data: IMedia) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { id, fileKey, fileUrl, comments, mimeType } = data;

  const FormData = z.object({
    id: z.string(),
    fileKey: z.string(),
    fileUrl: z.string().nullable(),
    mimeType: z.string().nullable(),
    comments: z.string().nullable()
  });

  const isValidData = FormData.parse({
    id,
    fileKey,
    fileUrl,
    comments,
    mimeType
  });

  await db.media.update({
    where: {
      id: id as string
    },
    data: {
      fileKey,
      fileUrl,
      comments: comments!,
      mimeType: mimeType!
    }
  });

  revalidatePath('/admin/media');
  return {
    message: 'Media updated successfully'
  };
};
