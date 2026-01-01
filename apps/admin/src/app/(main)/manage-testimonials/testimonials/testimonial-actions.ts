'use server';

import { ITestimonial } from '@/src/_models/testimonial.model';
import { db } from '@/src/server/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const createTestimonial = async (data: ITestimonial) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { name, title, active, mediaId, avgRating } = data;
  const FormData = z.object({
    name: z.string(),
    title: z.string(),
    active: z.boolean(),
    mediaId: z.string(),
    avgRating: z.string(),
  });
  const isValidData = FormData.parse({
    name,
    title,
    active,
    mediaId,
    avgRating,
  });
  if (!isValidData) {
    return {
      error: 'Invalid Data'
    };
  }
  await db.testimonials.create({
    data: {
      name: name,
      title: title,
      mediaId: mediaId,
      active: active,
      avgRating: avgRating,
    }
  });

  revalidatePath('/admin/testimonials');
  return {
    message: 'Testimonial added successfully'
  };
};

export const updateTestimonial = async (data: ITestimonial) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { id, name, title, active, mediaId, avgRating } = data;

  const FormData = z.object({
    name: z.string(),
    title: z.string(),
    active: z.boolean(),
    mediaId: z.string(),
    avgRating: z.string(),
  });
  const isValidData = FormData.parse({
    name,
    title,
    active,
    mediaId,
    avgRating
  });
  if (!isValidData) {
    return {
      error: 'Invalid Data'
    };
  }
  await db.testimonials.update({
    where: {
      id: id
    },
    data: {
      name: name,
      title: title,
      mediaId: mediaId,
      active: active,
      avgRating: avgRating,
    }
  });

  revalidatePath('/admin/testimonials');
  return {
    message: 'Testimonial updated successfully'
  };
};

export const deleteTestimonials = async(ids : string[]) => {
  const session = await getServerSession();
  if(!session){
  return  {
    error : "Unauthorised"
  }
  }
  try{
    await db.testimonials.deleteMany({
      where: {
        id : {
          in : ids
        }
      }
    })
    revalidatePath("/admin/testimonials")
    return {
      message : "Testimonials deleted successfully"
    }
  }
  catch(e){
    return{
      error : "Testimonials deletion error"
    }
  }
}
