'use server';
import { db } from '@/src/server/db';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { ProductVariantInventoryUpdateType } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { IInventoryUpdate } from './inventory-form-available';
import { error } from 'console';

export const createProductVariantInventory = async (data: IInventoryUpdate, productVariantId: string) => {
  const session = await getServerSession();

  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }
if(!session.user.email){
  return{
    error : 'Unauthorised'
  }
}
  const adminUser = await db.adminUser.findFirst({
    where: {
      email: session.user.email
    }
  });
  console.log("admin user", adminUser)
  
  const { quantity, reason, updateType } = data;

  const FormData = z.object({
    quantity: z.string(),
    reason: z.string(),
    updateType: z.enum([ProductVariantInventoryUpdateType.ADJUST_AVAILABLE, ProductVariantInventoryUpdateType.MOVE_TO_UNAVAILABLE])
  });

  const isValidData = FormData.parse({
    quantity,
    reason,
    updateType
  });

  if (!isValidData) {
    return {
      error: 'Invalid data'
    };
  }

  let productVariantInv = await db.productVariantInventory.findUnique({
    where: {
      id: data.productVariantInventoryId
    }
  });

  console.log('productVariantInv issssss', productVariantInv);

  if (!productVariantInv) {
    productVariantInv = await db.productVariantInventory.create({
      data: {
        productVariantId: productVariantId
      }
    });
  }

  if (data.updateType === ProductVariantInventoryUpdateType.ADJUST_AVAILABLE) {
    await db.productVariantInventory.update({
      data: {
        available: {
          increment: Number(data.quantity)
        },
        onHand: {
          increment: Number(data.quantity)
        }
      },
      where: {
        id: productVariantInv?.id
      }
    });
  } 
  else if (data.updateType === ProductVariantInventoryUpdateType.MOVE_TO_UNAVAILABLE && Number(productVariantInv.available) >= Number(data.quantity)) {
    await db.productVariantInventory.update({
      data: {
        unavailable: {
          increment: Number(data.quantity)
        },
        available: {
          decrement: Number(data.quantity)
        }
      },
      where: {
        id: productVariantInv?.id
      }
    });
  } else {
    return {
      error: 'Cannot move items to unavialable as we do not have that much quantity available'
    };
  }

  try {
    await db.productVariantInventoryUpdate.create({
      data: {
        quantity: parseInt(isValidData.quantity),
        reason: isValidData.reason,
        updateById: adminUser?.id!,
        productVariantInventoryId: productVariantInv.id,
        updateType: isValidData.updateType,

      }
    });
    revalidatePath('/admin/inventory');
    return {
      message: 'Inventory updated successfully'
    };
  } catch (err) {
    return {
      error: 'Error in updating the inventory'
    };
  }
};
