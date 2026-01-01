'use client';

import { Dialog } from 'primereact/dialog';
import { IShipRocket } from './orders-table';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import SubmitButton from '@/src/_components/shared/submit-button';
import useToastContext from '@/src/_hooks/useToast';
import shipRocketAction from './shipRocket-actions';

type IShipRocketForm = {
  shippingData: IShipRocket;
  orderId: string;
  showShipRocketDialog: boolean;
  onHide: () => void;
};
const ShipRocketForm = ({ shippingData, orderId, showShipRocketDialog, onHide }: IShipRocketForm) => {
  const { showToast } = useToastContext();
  const {
    control,
    handleSubmit,
    formState: { isLoading }
  } = useForm<IShipRocket>({
    defaultValues: {
      ...shippingData
    }
  });

  const submitForm = async (data: IShipRocket) => {
    console.log('values are', data);

    return shipRocketAction(data, orderId)
      .then((resp) => {
        if (resp.message) {
          onHide();
          showToast('success', 'Success', resp.message);
        }
        if (resp.error) {
          showToast('error', 'Error', resp.error);
        }
      })
      .catch((err) => {
        showToast('error', 'Error', 'Order failed to push to shiprocket.');
        console.log('err is', err);
      });
  };
  return (
    <>
      <Dialog header="Shipping Details of the order" visible={showShipRocketDialog} onHide={onHide}>
        <form onSubmit={handleSubmit(submitForm)} noValidate={true}>
          <div className="field flex flex-column gap-1">
            <label htmlFor="Length">Length (in cm)</label>
            <Controller
              name="length"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Length is required.'
                }
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <InputNumber
                      className={classNames({
                        'p-invalid': fieldState.error
                      })}
                      {...field}
                      value={field.value || 0}
                      onChange={(e) => field.onChange(e.value)}
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                );
              }}
            />
          </div>

          <div className="field flex flex-column gap-1">
            <label htmlFor="Breadth">Breadth (in cm)</label>
            <Controller
              name="breadth"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Breadth is required.'
                }
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <InputNumber
                      className={classNames({
                        'p-invalid': fieldState.error
                      })}
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                );
              }}
            />
          </div>

          <div className="field flex flex-column gap-1">
            <label htmlFor="Height">Height (in cm)</label>
            <Controller
              name="height"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Height is required.'
                }
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <InputNumber
                      className={classNames({
                        'p-invalid': fieldState.error
                      })}
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                );
              }}
            />
          </div>

          <div className="field flex flex-column gap-1">
            <label htmlFor="Weight">Weight (in kg)</label>
            <Controller
              name="weight"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Weight is required.'
                }
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <InputNumber
                      className={classNames({
                        'p-invalid': fieldState.error
                      })}
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                );
              }}
            />
          </div>

          <div className="flex flex-row gap-4">
            <Button label="Cancel" type="reset" icon="pi pi-times" severity="danger" onClick={onHide} />
            <SubmitButton label="Save" icon="pi pi-check" />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default ShipRocketForm;
