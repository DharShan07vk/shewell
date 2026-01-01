'use client';

import { Controller, useForm } from 'react-hook-form';
import { IInventoryData } from './inventory-table';
import { ProductVariantInventoryUpdateType } from '@repo/database';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import useToastContext from '@/src/_hooks/useToast';
import { InventoryOnHandActions } from './inventory-on-hand.actions';

export type IDataForOnHand = {
  adjustBy: string;
  reason: string;
  productVariantInventoryId: string;
};
const InventoryFormOnHand = ({ selectedRow }: { selectedRow: IInventoryData }) => {
  const { showToast } = useToastContext();

  const { control, handleSubmit } = useForm<IDataForOnHand>({
    defaultValues: {
      adjustBy: '',
      reason: '',
      productVariantInventoryId: selectedRow.productVariantInventory?.id || ''
    }
  });

  const onSubmit = (data: IDataForOnHand) => {
    console.log('onHandForm data is', data);
    return InventoryOnHandActions(data, selectedRow.id)
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
            <label htmlFor="Adjust By"></label>
            <Controller
              name="adjustBy"
              control={control}
              rules={{
                validate: {
                  positive: (value) => parseInt(value) >= 0 || 'AdjustBy must be positive'
                }
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <InputText
                      placeholder="Adjust By"
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

          <Button type="submit" className="flex justify-content-center">
            Update
          </Button>
        </div>
      </form>
    </>
  );
};
export default InventoryFormOnHand;
