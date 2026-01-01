'use server';
import { db } from '@/src/server/db';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { ProductVariantInventoryUpdateType } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { IInventoryUpdate } from './inventory-form-available';
import { IDataForOnHand } from './inventory-form-onHand';

export const InventoryOnHandActions = async (data: IDataForOnHand, productVariantId: string) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  const { adjustBy, reason } = data;

  const FormData = z.object({
    adjustBy: z.string(),
    reason: z.string()
  });

  const isValidData = FormData.parse({
    adjustBy,
    reason
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  //whether the productVarinatInventory exists or not
  let productVariantInv = await db.productVariantInventory.findUnique({
    where: {
      id: data.productVariantInventoryId
    }
  });

  //if not exists then create it
  if (!productVariantInv) {
    productVariantInv = await db.productVariantInventory.create({

      data: {
        productVariantId: productVariantId
        
      }
    });
  }

  //after creating it update it's content as per the values in the form

  try {
    await db.productVariantInventory.update({
      data: {
        onHand: {
          
          increment: Number(data.adjustBy)
        },
        
      },
      where: {
        id: productVariantInv?.id
      }
    });
    revalidatePath('/manage-products/inventory');
    return {
      message: 'OnHand adjusted successfully'
    };
  } catch (err) {
    return {
      error: 'Error in adjusting OnHand'
    };
  }
};
