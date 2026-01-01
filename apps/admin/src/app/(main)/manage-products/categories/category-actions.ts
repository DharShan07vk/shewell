'use server';

import { db } from '@/src/server/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { ICategory } from '@/src/_models/category.model';
import { getServerSession } from 'next-auth';

export const createCategory = async (data: ICategory) => {
  // const session = await getServerSession();

  // if (!session) {
  //   return {
  //     error: 'Unauthorized'
  //   };
  // }

  const { name, active, parentCategoryId, slug } = data;

  const FormData = z.object({
    name: z.string().min(1),
    active: z.boolean().optional(),
    parentCategoryId: z.string().nullable(),
    // password: z.string().min(8).nullable()
    slug: z.string()
  });

  const isValidData = FormData.parse({
    name,
    active,
    parentCategoryId,
    slug
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }
  const slugExists = await db.category.findFirst({
    select: {
      id: true
    },
    where: {
      slug: {
        equals: slug,
        mode: 'insensitive'
      },
      deletedAt : null
    }
  });
  if (slugExists) {
    return {
      error: 'Slug is not unique. Please choose a unique slug.'
    };
  }

  await db.category.create({
    data: {
      name: name as string,
      active: active,
      parentCategoryId: parentCategoryId,
      slug: slug
    }
  });

  revalidatePath('/manage-products/categories');
  revalidatePath('/manage-products/products');
  return {
    message: 'Category created successfully'
  };
};

export const updateCategory = async (data: ICategory) => {
  // const session = await getServerSession();

  // if (!session) {
  //   return {
  //     error: 'Unauthorized'
  //   };
  // }

  const { id, name, active, parentCategoryId, slug } = data;

  const FormData = z.object({
    id: z.string(),
    name: z.string().min(1),
    active: z.boolean().optional(),
    parentCategoryId: z.string().nullable(),
    slug: z.string()
    // password: z.string().min(8).nullable()
  });

  const isValidData = FormData.parse({
    id,
    name,
    active,
    parentCategoryId,
    slug
  });

  await db.category.update({
    where: {
      id: id as string
    },
    data: {
      name: name as string,
      parentCategoryId: parentCategoryId,
      active: active,
      slug: slug
    }
  });

  revalidatePath('/manage-products/categories');
  revalidatePath('/manage-products/products');
  return {
    message: 'Category updated successfully'
  };
};
export const deleteCategory = async (categoryId: string) => {
  const categories = await db.category.findUnique({
    where: {
      id: categoryId
    },
    include: {
      childCategories: {
        where: {
          deletedAt: null
        }
      },
      products: {
        where: {
          deletedAt: null
        }
      }
    }
  });

  if (categories?.childCategories && categories?.childCategories.length > 0) {
    return {
      error: 'Cannot delete this as there are child categories associated with it'
    };
  }
  if (categories?.products && categories?.products.length > 0) {
    return {
      error: 'Cannot delete this as there are products associated with it'
    };
  }
  try {
    await db.category.update({
      where: {
        id: categoryId
      },
      data: {
        deletedAt: new Date()
      }
    });
    revalidatePath('/manage-products/categories');
    return {
      message: 'Categories deleted successfully'
    };
  } catch (err) {
    return {
      error: 'Error in deleting categories'
    };
  }
};
