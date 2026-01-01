import { ICurrency, IProduct, IProductForm } from '@/src/_models/product.model';
import React, { useEffect, useState } from 'react';
import useToastContext from '@/src/_hooks/useToast';
import { Control, Controller, FieldValues, get, useFieldArray, UseFieldArrayRemove, useForm, useFormContext, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FileUpload, FileUploadSelectEvent, FileUploadUploadEvent } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';

import { MultiStateCheckbox } from 'primereact/multistatecheckbox';

import SubmitButton from '@/src/_components/shared/submit-button';
import { createProduct, updateProduct } from '@/src/app/(main)/manage-products/products/product-actions';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { Editor } from 'primereact/editor';
import { InputTextarea } from 'primereact/inputtextarea';
import { Chips } from 'primereact/chips';
import { IBrand } from '@/src/_models/brand.model';
import { errorHandlingZodError, slugifyName } from '@/src/lib/utils';
import { Calendar } from 'primereact/calendar';
import '@/styles/global.css';

type IProductFormProps = {
  product: IProduct;
  productDialog: boolean;
  categories: { id: string; name: string; active: boolean; childCategories: { id: string; name: string }[] }[];
  // currencies: ICurrency[];
  // brands: Pick<IBrand, 'id' | 'name'>[];
  hideDialog: () => void;
};

const ProductForm = ({ product, categories, productDialog, hideDialog }: IProductFormProps) => {
  const { showToast } = useToastContext();
  const {
    watch,
    getValues,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { isLoading }
  } = useForm<IProductForm>({
    defaultValues: {
      ...product,
      productVariants: product.productVariants.map((pv) => ({ ...pv, priceInCents: pv.priceInCents / 100, discountInCents: pv.discountInCents && pv.discountInCents / 100 }))
    }
  });

  const {
    fields: productBenefitsFields,
    append: productBenefitsAppend,
    remove: productBenefitsRemove
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'productBenefits' // unique name for your Field Array
  });

  // const {
  //   fields: productStatsFields,
  //   append: productStatsAppend,
  //   remove: productStatsRemove
  // } = useFieldArray({
  //   control,
  //   name: 'productStats'
  // });

  const {
    fields: productVariantsFields,
    append: productVariantsAppend,
    remove: productVariantsRemove
  } = useFieldArray({
    control,
    name: 'productVariants'
  });

  const {
    fields: productFAQfield,
    append: productFAQappend,
    remove: productFAQremove
  } = useFieldArray({
    control,
    name: 'faq'
  });
  useEffect(() => {
    reset({
      ...product,
      productVariants: product.productVariants.map((pv) => ({ ...pv, priceInCents: pv.priceInCents / 100, discountInCents: pv.discountInCents && pv.discountInCents / 100 }))
    });
  }, [product]);

  const callServerAction = (data: IProductForm) => {
    console.log(data);
    if (product?.id) {
      return updateProduct(data);
    } else {
      return createProduct(data);
    }
  };

  const submitForm = (data: IProductForm) => {
    console.log('data', data);
    return callServerAction(data)
      .then((resp) => {
        if (resp.error) {
          let message = errorHandlingZodError(resp.error);
          showToast('error', 'Error', message);
        }
        if (resp.message) {
          showToast('success', 'Successful', resp.message);
          hideDialog();
        }
      })
      .catch((err) => {
        let message = errorHandlingZodError(err.message);
        showToast('error', 'Error', message);
      })
      .finally(() => {});
  };
  const errorHandler = (e: any) => {
    console.log(e);
  };
  const watchedName = watch('name');
  const slug = slugifyName(watchedName);

  useEffect(() => {
    setValue('slug', slug);
  }, [watchedName]);
  return (
    <Dialog maximizable={true} visible={productDialog} style={{ width: '50vw' }} header="Product Details" modal className="p-fluid" onHide={hideDialog}>
      <form onSubmit={handleSubmit(submitForm, errorHandler)} noValidate={true}>
        <input type="hidden" name="id" value={product?.id} />
        {/* <div className="field">
          <label htmlFor="brandId">Brand (Required*)</label>
          <Controller
            name="brandId"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Brand is required.'
              }
            }}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Dropdown {...field} options={brands} optionLabel="name" optionValue="id" placeholder="Select brand" filter className="w-full" />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div> */}
        <div className="field">
          <label htmlFor="categoryId">Category (Required*)</label>
          <Controller
            name="categoryId"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Category is required.'
              }
            }}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Dropdown {...field} options={categories} optionLabel="name" optionValue="id" placeholder="Select category" filter className="w-full" />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="name">Name (Required*)</label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Name is required.'
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
                    onChange={(e) => {
                      const slug = slugifyName(e.target.value);
                      setValue('slug', slug);
                      field.onChange(e.target.value);
                    }}
                  />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="slug">Slug (Required*)</label>
          <Controller
            name="slug"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Slug is required.'
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
                    value={field.value || ''}
                  />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="seoTitle">SEO Title</label>
          <Controller
            name="seoTitle"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <InputText
                    className={classNames({
                      'p-invalid': fieldState.error
                    })}
                    {...field}
                    value={field.value || ''}
                  />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="seoDescription">SEO Description</label>
          <Controller
            name="seoDescription"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <InputTextarea
                    className={classNames({
                      'p-invalid': fieldState.error
                    })}
                    {...field}
                    value={field.value || ''}
                    rows={5}
                  />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="seoKeywords">SEO Keywords</label>
          <Controller
            name="seoKeywords"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Chips
                    className={classNames({
                      'p-invalid': fieldState.error
                    })}
                    {...field}
                    value={field.value || []}
                    separator=","
                  />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="shortDescription">Short Description (Required*)</label>
          <Controller
            name="shortDescription"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Short Description is required.'
              }
            }}
            render={({ field, fieldState }) => {
              return (
                <>
                  <InputTextarea
                    className={classNames({
                      'p-invalid': fieldState.error
                    })}
                    {...field}
                    value={field.value || ''}
                    rows={5}
                  />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="description">Description (Required*)</label>
          <Controller
            name="description"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Description is required.'
              }
            }}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Editor
                    className={classNames({
                      'p-invalid': fieldState.error
                    })}
                    {...field}
                    onTextChange={(e) => field.onChange(e.htmlValue)}
                    style={{ height: '320px' }}
                  />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>
        <div className="flex gap-5">
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
          <div className="field">
            <Controller
              name="bestSeller"
              control={control}
              render={({ field }) => {
                return (
                  <div className="flex gap-2">
                    <Checkbox checked={field.value} {...field} />
                    <label htmlFor="bestSeller">Bestseller</label>
                  </div>
                );
              }}
            />
          </div>
        </div>
        {/* <div>
          <p>Veg or Non-Veg</p>
          <div className="field">
            <Controller
              name="veg"
              control={control}
              render={({ field }) => {
                return (
                  <div className="flex gap-2">
                    <MultiStateCheckbox value={field.value} onChange={field.onChange} options={options} optionValue="value" />
                    <label htmlFor="active">{field.value || 'No Label'}</label>
                  </div>
                );
              }}
            />
          </div>
        </div> */}
        <div className="flex justify-content-between">
          <h4 className='mt-2'>Product FAQ's</h4>
          <Button
            className="size-[10px]"
            type="button"
            icon="pi pi-plus"
            onClick={() =>
              productFAQappend({
                ...{
                  id: new Date().getTime().toString(),
                  question: '',
                  answer: '',
                  order: 0
                }
              })
            }
          />
        </div>
        {productFAQfield.map((field, index) => (
          <Card
            title={
              <div className="flex justify-content-between">
                {`Product FAQ ` + (index + 1)}
                <Button icon="pi pi-trash" severity="danger" type="button" onClick={() => productFAQremove(index)} />
              </div>
            }
            key={field.id}
            className="my-2"
          >
            <div className="grid grid-cols-1 ">
              <div className="field w-full">
                <label htmlFor={`faq.${index}.question`}>Question</label>
                <Controller
                  name={`faq.${index}.question`}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Question is required for Product FAQ'
                    }
                  }}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <InputText
                          type="text"
                          placeholder="Enter the question"
                          style={{ width: '100%' }}
                          className={classNames({
                            'p-invalid': fieldState.error
                          })}
                          {...field}
                          value={field.value || ''}
                        />
                        {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                      </>
                    );
                  }}
                />
              </div>
              <div className="field w-full">
                <label htmlFor={`faq.${index}.answer`}>Answer</label>
                <Controller
                  name={`faq.${index}.answer`}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Answer is required for Product FAQ'
                    }
                  }}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <InputTextarea
                          placeholder="Enter the answer"
                          style={{ width: '100%' }}
                          className={classNames({
                            'p-invalid': fieldState.error
                          })}
                          {...field}
                          value={field.value || ''}
                          rows={4}
                        />
                        {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                      </>
                    );
                  }}
                />
              </div>
              <div className=" field w-full">
                <label htmlFor={`faq.${index}.order`}>Order</label>
                <Controller
                  name={`faq.${index}.order`}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Order is required for Product FAQ'
                    }
                  }}
                  render={({ field, fieldState }) => {
                    return (
                      <>
                        <InputText
                          type="text"
                          placeholder="Enter the order"
                          style={{ width: '100%' }}
                          className={classNames({
                            'p-invalid': fieldState.error
                          })}
                          {...field}
                          value={field.value?.toString()}
                          onChange={(e) => {
                            const parsedValue = parseInt(e.target.value);
                            if (!isNaN(parsedValue)) {
                              field.onChange(parsedValue);
                            } else {
                              field.onChange('');
                            }
                          }}
                        />
                        {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                      </>
                    );
                  }}
                />
              </div>
            </div>
          </Card>
        ))}

        <hr />
        <div className="flex justify-content-between mb-4">
          <h4>Product Variants</h4>
          <Button
            type="button"
            icon="pi pi-plus"
            onClick={() =>
              productVariantsAppend({
                ...{
                  id: new Date().getTime().toString(),
                  name: '',
                  priceInCents: 0,
                  discountInCents: null,
                  discountInPercentage: null,
                  discountEndDate: null,
                  isPercentage: false
                }
              })
            }
          />
        </div>
        {productVariantsFields.map((field, index) => (
          <Card
            title={
              <div className="flex justify-content-between">
                {`Product Variant ` + (index + 1)}
                <Button icon="pi pi-trash" severity="danger" type="button" onClick={() => productVariantsRemove(index)} />
              </div>
            }
            key={field.id}
            className="my-2"
          >
            <NestedCurrency watch={watch} index={index} control={control} setValue={setValue} getValues={getValues} />
          </Card>
        ))}
        <hr />
        {/*<div className="flex justify-content-between mb-4">*/}
        {/*  <h4>Product Stats</h4>*/}
        {/*  <Button*/}
        {/*    type="button"*/}
        {/*    icon="pi pi-plus"*/}
        {/*    onClick={() =>*/}
        {/*      productStatsAppend({*/}
        {/*        ...{*/}
        {/*          id: new Date().getTime().toString(),*/}
        {/*          title: '',*/}
        {/*          stat: ''*/}
        {/*        }*/}
        {/*      })*/}
        {/*    }*/}
        {/*  />*/}
        {/*</div>*/}
        {/*{productStatsFields.map((field, index) => (*/}
        {/*  <Card*/}
        {/*    title={*/}
        {/*      <div className="flex justify-content-between">*/}
        {/*        {`Product Stat ` + (index + 1)}*/}
        {/*        <Button icon="pi pi-trash" severity="danger" type="button" onClick={() => productStatsRemove(index)} />*/}
        {/*      </div>*/}
        {/*    }*/}
        {/*    key={field.id}*/}
        {/*    className="my-2"*/}
        {/*  >*/}
        {/*    <div className="grid grid-cols-2 gap-3">*/}
        {/*      <div className="field mb-2">*/}
        {/*        <Controller*/}
        {/*          name={`productStats.${index}.title`}*/}
        {/*          control={control}*/}
        {/*          rules={{*/}
        {/*            required: {*/}
        {/*              value: true,*/}
        {/*              message: 'Title is required.'*/}
        {/*            }*/}
        {/*          }}*/}
        {/*          render={({ field, fieldState }) => {*/}
        {/*            return (*/}
        {/*              <>*/}
        {/*                <InputText*/}
        {/*                  placeholder="Title"*/}
        {/*                  className={classNames({*/}
        {/*                    'p-invalid': fieldState.error*/}
        {/*                  })}*/}
        {/*                  {...field}*/}
        {/*                />*/}
        {/*                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}*/}
        {/*              </>*/}
        {/*            );*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*      <div className="field mb-2">*/}
        {/*        <Controller*/}
        {/*          name={`productStats.${index}.stat`}*/}
        {/*          control={control}*/}
        {/*          rules={{*/}
        {/*            required: {*/}
        {/*              value: true,*/}
        {/*              message: 'Stat is required.'*/}
        {/*            }*/}
        {/*          }}*/}
        {/*          render={({ field, fieldState }) => {*/}
        {/*            return (*/}
        {/*              <>*/}
        {/*                <div className="p-inputgroup flex-1">*/}
        {/*                  /!*<span className="p-inputgroup-addon">$</span>*!/*/}
        {/*                  <InputText placeholder="Stat" {...field} />*/}
        {/*                </div>*/}
        {/*                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}*/}
        {/*              </>*/}
        {/*            );*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Card>*/}
        {/*))}*/}
        {/*<hr />*/}
        <div className="flex justify-content-between mb-4">
          <h4>Product Benefits</h4>
          <Button
            type="button"
            icon="pi pi-plus"
            onClick={() =>
              productBenefitsAppend({
                ...{
                  id: new Date().getTime().toString(),
                  benefit: ''
                }
              })
            }
          />
        </div>
        {productBenefitsFields.map((field, index) => (
          <div key={`product-benefit-${field.id}`} className="mb-2">
            <Controller
              name={`productBenefits.${index}.benefit`}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Benefit is required.'
                }
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <div className="p-inputgroup flex-1">
                      <InputText
                        placeholder={`Product Benefit ` + (index + 1)}
                        className={classNames({
                          'p-invalid': fieldState.error
                        })}
                        {...field}
                      />
                      <Button className="p-inputgroup-addon" icon="pi pi-trash" severity="danger" type="button" onClick={() => productBenefitsRemove(index)} />
                    </div>
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                );
              }}
            />
          </div>
        ))}
        <div className="flex flex-row gap-4">
          <Button label="Cancel" type="reset" icon="pi pi-times" severity="danger" onClick={hideDialog} />
          <SubmitButton label="Save" icon="pi pi-check" />
        </div>
      </form>
    </Dialog>
  );
};

const NestedCurrency = ({
  watch,
  index,
  control,
  setValue
}: {
  watch: UseFormWatch<IProductForm>;
  index: number;

  control: Control<IProductForm, any>;
  setValue: UseFormSetValue<IProductForm>;
  getValues: UseFormGetValues<IProductForm>;
}) => {
  const isPercentage = watch(`productVariants.${index}.isPercentage`);

  return (
    <>
      <div className="field mb-2">
        <Controller
          name={`productVariants.${index}.name`}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Name is required.'
            }
          }}
          render={({ field, fieldState }) => {
            return (
              <>
                <InputText
                  placeholder="Variant Name"
                  className={classNames({
                    'p-invalid': fieldState.error
                  })}
                  {...field}
                />
                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
              </>
            );
          }}
        />
      </div>
      <div className="field mb-2">
        <label htmlFor={`productVariants.${index}.priceInCents`}>Price</label>
        <Controller
          name={`productVariants.${index}.priceInCents`}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Price is required.'
            },
            min: {
              value: 0,
              message: 'Price must be greater than 0.'
            }
          }}
          render={({ field, fieldState }) => {
            return (
              <>
                <div className="p-inputgroup flex-1">
                  {/*<span className="p-inputgroup-addon">$</span>*/}
                  <InputNumber
                    placeholder="Price"
                    className={classNames({
                      'p-invalid': fieldState.error
                    })}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                  />
                </div>
                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
              </>
            );
          }}
        />
      </div>
      <div className="flex gap-2 align-items-center mb-2">
        <Controller
          name={`productVariants.${index}.isPercentage`}
          control={control}
          render={({ field }) => {
            return (
              <>
                <InputSwitch
                  checked={!!isPercentage}
                  onChange={(e) => {
                    if (e.value) {
                      setValue(`productVariants.${index}.discountInCents`, null);
                    } else {
                      setValue(`productVariants.${index}.discountInPercentage`, null);
                    }
                    setValue(`productVariants.${index}.isPercentage`, e.value);
                  }}
                />{' '}
                Discount is Percentage
              </>
            );
          }}
        />
      </div>
      {!isPercentage && (
        <div className="field mb-2">
          <label htmlFor={`productVariants.${index}.discountInCents`}>Discount</label>
          <Controller
            name={`productVariants.${index}.discountInCents`}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <div className="p-inputgroup flex-1">
                    {/*<span className="p-inputgroup-addon">$</span>*/}
                    <InputNumber
                      placeholder="Discount (Optional)"
                      className={classNames({
                        'p-invalid': fieldState.error
                      })}
                      {...field}
                      onChange={(e) => field.onChange(e.value)}
                    />
                  </div>
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>
      )}
      {isPercentage && (
        <div className="field mb-2">
          <label htmlFor={`productVariants.${index}.discountInPercentage`}>Discount In Percentage</label>
          <Controller
            name={`productVariants.${index}.discountInPercentage`}
            control={control}
            rules={{
              min: {
                value: 0,
                message: 'Discount must be greater than 0.'
              },
              max: {
                value: 100,
                message: 'Discount must be less than 100.'
              }
            }}
            render={({ field, fieldState }) => {
              return (
                <>
                  <div className="p-inputgroup flex-1">
                    {/*<span className="p-inputgroup-addon">$</span>*/}
                    <InputNumber
                      placeholder="Discount (Optional)"
                      className={classNames({
                        'p-invalid': fieldState.error
                      })}
                      {...field}
                      onChange={(e) => field.onChange(e.value)}
                    />
                  </div>
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>
      )}
      <div className="field mb-2">
        <label htmlFor={`productVariants.${index}.discountEndDate`}>Discount End Date</label>
        <Controller
          name={`productVariants.${index}.discountEndDate`}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <>
                <div className="p-inputgroup flex-1">
                  {/*<span className="p-inputgroup-addon">$</span>*/}
                  <Calendar
                    className={classNames({
                      'p-invalid': fieldState.error
                    })}
                    {...field}
                    onChange={(e) => field.onChange(e.value)}
                    showIcon
                  />
                </div>
                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
              </>
            );
          }}
        />
      </div>
    </>
  );
};

export default ProductForm;
