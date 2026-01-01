'use client';

import { Controller, useForm } from 'react-hook-form';
import { IInventoryData } from './inventory-table';
import {ProductVariantInventoryUpdateType} from "@repo/database"
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import useToastContext from '@/src/_hooks/useToast';
import { createProductVariantInventory } from './inventory.actions';

export type IInventoryUpdate = {
  id?: string;
  quantity: string;
  reason: string;
  updateType: string;
  productVariantInventoryId: string;
  updateById: string;
};
const InventoryFormAvailable = ({ selectedRow }: { selectedRow: IInventoryData }) => {
  const { showToast } = useToastContext();
  const { control, handleSubmit } = useForm<IInventoryUpdate>({
    defaultValues: {
      quantity: '0',
      reason: '',
      updateType: ProductVariantInventoryUpdateType.ADJUST_AVAILABLE,
      productVariantInventoryId: selectedRow.productVariantInventory?.id || '',
      updateById: ''
    }
  });
  const callServerAction = (data: IInventoryUpdate) => {
    return createProductVariantInventory(data, selectedRow.id);
  };
  const onSubmit = (data: IInventoryUpdate) => {
    console.log('inventory update data is', data);
    return callServerAction(data)
      .then((resp) => {
        if (resp?.error) {
          showToast('error', 'Error', resp.error);
        }
        if (resp?.message) {
          showToast('success', 'Successful', resp.message);
        }
      })
      .catch((err) => {
        showToast('error', 'Error', err.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* quantity */}
        <div className="flex flex-column gap-2">
          <div className="flex flex-column gap-1">
            <label htmlFor="quantity">Quantity</label>
            <Controller
              name="quantity"
              control={control}
              rules={{
                validate: {
                  positive: (value) => parseInt(value) >= 0 || 'Quantity must be positive'
                }
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <InputText
                      className={classNames({
                        'p-invalid': fieldState.error
                      })}
                      {...field}
                      onChange={field.onChange}
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                );
              }}
            />
          </div>

          {/* Reason */}

          <div className="flex flex-column gap-1">
            <label htmlFor="reason">Reason</label>
            <Controller
              name="reason"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Reason is required.'
                }
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <InputText
                      className={classNames({
                        'p-invalid': fieldState.error
                      })}
                      placeholder="Enter the Reason"
                      {...field}
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                );
              }}
            />
          </div>

          {/* UpdateType */}

          <div className="flex flex-column gap-1">
            <label htmlFor="updateType">Update Type</label>
            <Controller
              control={control}
              name="updateType"
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Dropdown className="w-full" {...field} onChange={field.onChange} options={[ProductVariantInventoryUpdateType.ADJUST_AVAILABLE, ProductVariantInventoryUpdateType.MOVE_TO_UNAVAILABLE]} />
                  </>
                );
              }}
            />
          </div>

          <Button type="submit" className="flex justify-content-center">
            Update
          </Button>
        </div>
      </form>
    </>
  );
};
export default InventoryFormAvailable;
