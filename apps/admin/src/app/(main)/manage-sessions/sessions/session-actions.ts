'use server';

import { ISession } from '@/src/_models/session.model';
import { db } from '@/src/server/db';
import { SessionStatus, SessionType } from '@repo/database';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const createSessionSchema = (type?: SessionType) => {
  return z
    .object({
      title: z.string().min(1, 'Title is required'),
      slug: z.string().min(1, 'Slug is required'),
      startAt: z.date(),
      endAt: z.date(),
      price: z.coerce.number().min(0, 'Price must be 0 or greater'),
      status: z.nativeEnum(SessionStatus),
      categoryId: z.string().min(1, 'Category is required'),

      // New fields
      thumbnailMediaId: z.string().optional().nullable(),
      bannerMediaId: z.string().optional().nullable(),
      overview: z.string().optional().nullable(),
      meetingLink: z.string().url('Meeting link must be a valid URL').optional().nullable().or(z.literal('')),
      language: z.string().default('English'),
      type: z.nativeEnum(SessionType).default(SessionType.ONLINE)
    })
    .refine(
      (data) => {
        // Validate that endAt is after startAt
        return data.endAt > data.startAt;
      },
      {
        message: 'End time must be after start time',
        path: ['endAt']
      }
    )
    .refine(
      (data) => {
        // If type is ONLINE, meetingLink is required
        if (data.type === SessionType.ONLINE) {
          return data.meetingLink && data.meetingLink.length > 0;
        }
        return true;
      },
      {
        message: 'Meeting link is required for online sessions',
        path: ['meetingLink']
      }
    );
};

export const createSession = async (data: ISession) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { title, slug, startAt, endAt, price, status, categoryId, thumbnailMediaId, bannerMediaId, overview, meetingLink, language, type } = data;

  const Schema = createSessionSchema(type);

  const isValidData = Schema.safeParse({
    title,
    slug,
    startAt,
    endAt,
    price,
    status,
    categoryId,
    thumbnailMediaId,
    bannerMediaId,
    overview,
    meetingLink: meetingLink || null,
    language: language || 'English',
    type: type || SessionType.ONLINE
  });

  if (!isValidData.success) {
    return {
      error: 'Invalid Data',
      details: isValidData.error.flatten()
    };
  }

  try {
    await db.session.create({
      data: {
        title,
        slug,
        startAt,
        endAt,
        price,
        status,
        categoryId,
        thumbnailMediaId,
        bannerMediaId,
        overview,
        meetingLink: meetingLink || null,
        language: language || 'English',
        type: type || SessionType.ONLINE
      }
    });

    revalidatePath('/admin/manage-sessions/sessions');
    return {
      message: 'Session added successfully'
    };
  } catch (error: any) {
    console.error('Error creating session:', error);
    if (error.code === 'P2002') {
      return { error: 'Slug must be unique.' };
    }
    return {
      error: 'Failed to create session'
    };
  }
};

export const updateSession = async (data: ISession) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { id, title, slug, startAt, endAt, price, status, categoryId, thumbnailMediaId, bannerMediaId, overview, meetingLink, language, type } = data;

  if (!id) {
    return {
      error: 'ID is required for update'
    };
  }

  const Schema = createSessionSchema(type);

  const isValidData = Schema.safeParse({
    title,
    slug,
    startAt,
    endAt,
    price,
    status,
    categoryId,
    thumbnailMediaId,
    bannerMediaId,
    overview,
    meetingLink: meetingLink || null,
    language: language || 'English',
    type: type || SessionType.ONLINE
  });

  if (!isValidData.success) {
    return {
      error: 'Invalid Data',
      details: isValidData.error.flatten()
    };
  }

  try {
    await db.session.update({
      where: {
        id: id
      },
      data: {
        title,
        slug,
        startAt,
        endAt,
        price,
        status,
        categoryId,
        thumbnailMediaId,
        bannerMediaId,
        overview,
        meetingLink: meetingLink || null,
        language: language || 'English',
        type: type || SessionType.ONLINE
      }
    });

    revalidatePath('/admin/manage-sessions/sessions');
    return {
      message: 'Session updated successfully'
    };
  } catch (error: any) {
    console.error('Error updating session:', error);
    if (error.code === 'P2002') {
      return { error: 'Slug must be unique.' };
    }
    return {
      error: 'Failed to update session'
    };
  }
};

export const deleteSession = async (ids: string[]) => {
  const session = await getServerSession();
  if (!session) {
    return {
      error: 'Unauthorised'
    };
  }
  try {
    await db.session.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
    revalidatePath('/admin/manage-sessions/sessions');
    return {
      message: 'Sessions deleted successfully'
    };
  } catch (e) {
    console.error('Error deleting session:', e);
    return {
      error: 'Sessions deletion error'
    };
  }
};
