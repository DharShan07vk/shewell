import SubmitButton from '@/src/_components/shared/submit-button';
import { ICoupon } from '@/src/_models/coupon.model';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from 'react-hook-form';
import { createCoupon, updateCoupon } from './coupons.action';
import useToastContext from '@/src/_hooks/useToast';
import '@/styles/global.css'

type ICouponFormProps = {
  coupon: ICoupon;
  categories: {
    id: string;
    name: string;
    active: boolean;
    parentCategory: {
      id: string;
      name: string;
      parentCategory: {
        id: string;
        name: string;
      } | null;
    } | null;
  }[];
  products: { id: string; name: string; active: boolean }[];
  hideDialog: () => void;
};

const CouponForm = ({ coupon, categories, products, hideDialog }: ICouponFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isLoading }
  } = useForm<ICoupon>({ defaultValues: coupon });
  const { showToast } = useToastContext();

  const callServerAction = (data: ICoupon) => {
    if (coupon.id) {
      // console.log('update coupon');
      return updateCoupon({ ...data, categoryIds: data.categoryIds || [], productIds: data.productIds || [] });
    } else {
      // console.log('create coupon');
      return createCoupon({ ...data, categoryIds: data.categoryIds || [], productIds: data.productIds || [] });
    }
  };

  const submitForm = (data: ICoupon) => {
    // console.log(data);
    return callServerAction(data)
      ?.then((resp) => {
        if (resp.error) {
          showToast('error', 'Error', resp.error);
        }
        if (resp.message) {
          showToast('success', 'Successful', resp.message);
          hideDialog();
        }
      })
      .catch((err) => {
        showToast('error', 'Error', err.message);
        // console.log(err)
      })
      .finally(() => {});
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="field">
        <label htmlFor="code">Code</label>
        <Controller
          name="code"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'code is required'
            }
          }}
          render={({ field, fieldState }) => {
            return (
              <>
                <InputText
                  className={classNames({
                    'p-invalid': fieldState.error
                  })}
                  placeholder="DX20"
                  {...field}
                />
                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
              </>
            );
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="amount">Amount</label>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Amount is required'
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

      <div className="field">
        <Controller
          name="isPercent"
          control={control}
          render={({ field }) => {
            return (
              <>
                <div className="flex gap-2 ">
                  <Checkbox checked={field.value} {...field} />
                  <label htmlFor="isPercent">Amount in Percent?</label>
                </div>
              </>
            );
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <Controller
          name="description"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Coupan description is required'
            }
          }}
          render={({ field, fieldState }) => {
            return (
              <>
                <InputTextarea
                  className={classNames({
                    'p-invalid': fieldState.error
                  })}
                  rows={4}
                  cols={13}
                  {...field}
                />
                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
              </>
            );
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="expiresAt">Expiry Date</label>
        <Controller
          name="expiresAt"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Expiry date is required'
            }
          }}
          render={({ field, fieldState }) => {
            return (
              <>
                <Calendar  dateFormat="dd/mm/yy" {...field} className={classNames({ 'p-invalid ': fieldState.error })} />

                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
              </>
            );
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <Controller
          name="categoryIds"
          control={control}
          rules={
            {
              // required: {
              //   value: true,
              //   message: 'Category is required.'
              // }
            }
          }
          render={({ field, fieldState }) => {
            return (
              <>
                <MultiSelect
                  {...field}
                  options={categories.map((c) => ({
                    id: c.id,
                    name: `${c.parentCategory?.parentCategory ? c.parentCategory?.parentCategory?.name + ' - ' : ''} ${c.parentCategory && c.parentCategory.name + ' - '} ${c.name}`
                  }))}
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Select category"
                  filter
                  className="w-full"
                />
                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
              </>
            );
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="product">Product</label>
        <Controller
          name="productIds"
          control={control}
          rules={
            {
              // required: {
              //   value: true,
              //   message: 'Product is required.'
              // }
            }
          }
          render={({ field, fieldState }) => {
            return (
              <>
                <MultiSelect {...field} options={products} optionLabel="name" optionValue="id" placeholder="Select product" filter className="w-full" />
                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
              </>
            );
          }}
        />
      </div>

      <div className="field">
        <Controller
          name="active"
          control={control}
          render={({ field }) => {
            return (
              <div className="flex gap-2">
                <Checkbox checked={field.value} {...field} />
                <label htmlFor="active">Active</label>
              </div>
            );
          }}
        />
      </div>

      <div className="flex flex-row gap-4">
        <Button label="Cancel" type="reset" icon="pi pi-times" severity="danger" onClick={hideDialog} />
        <SubmitButton label="Save" icon="pi pi-check" />
      </div>
    </form>
  );
};
export default CouponForm;
