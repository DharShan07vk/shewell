import { IMediaOnProducts, IProduct, IProductForm } from '@/src/_models/product.model';
import { useDropzone } from 'react-dropzone';
import { Dialog } from 'primereact/dialog';
import React, { useCallback, useEffect, useState } from 'react';
import uploadProductImage from '@/src/app/(main)/upload-image-actions';
import useToastContext from '@/src/_hooks/useToast';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Image } from 'primereact/image';
import { updateProductImages } from '@/src/app/(main)/manage-products/products/product-actions';
import { Sidebar } from 'primereact/sidebar';
import ImageSelector from '@/src/app/(main)/manage-products/products/image-selector';
import { IMedia } from '@/src/_models/media.model';

type IProductImageSelectionDialogProps = {
  product: IProduct;
  mediaOnProducts: IMediaOnProducts[];
  productImageSelectionDialog: boolean;
  hideDialog: () => void;
};

const ProductImageSelectionDialog = ({ product, productImageSelectionDialog, mediaOnProducts, hideDialog }: IProductImageSelectionDialogProps) => {

  const { showToast } = useToastContext();
  const [images, setImages] = useState<IMediaOnProducts[]>([]);
  const [imageChooser, setImageChooser] = useState<boolean>(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    acceptedFiles.forEach((image) => {
      // setUploadingState(1);
      uploadProductImage(image.name, image.type)
        .then(async (resp) => {
          // if (resp.error) {
          //   showToast('error', 'Error', resp.error);
          //   return;
          // }
          const { presignedUrl, id, fileUrl, key } = resp;
          // setValue('fileKey', key!);
          // setValue('fileUrl', imageUrl);
          // setValue('mimeType', image.type);
          const requestOptions = {
            method: 'PUT',
            // headers: {
            //   'Content-type': image.type
            // 'x-amz-acl': 'public-read'
            // },
            body: image
          };
          try {
            const res = await fetch(presignedUrl!, requestOptions);
            console.log(res, presignedUrl);
            if (res.ok) {
              mediaAppend({
                productId: product.id,
                order: images.length,
                imageAltText: '',
                comment: '',
                mediaId: id!,
                media: { id, fileKey: key!, fileUrl }
              });
            }
          } catch (e) {}
          // if (res.ok) {
          //   setValue('imageKey', key);
          // }
        })
        .catch((resp) => {});
    });
    // Do something with the files
  }, []);

  const { control, handleSubmit, setValue } = useForm<{ media: IMediaOnProducts[] }>({
    defaultValues: {
      media: mediaOnProducts
    }
  });

  useEffect(() => {
    console.log("product.media", product.media)
    if(!product.media) return;
    setValue('media', product.media);
  }, [product]);

  const {
    fields: mediaFields,
    append: mediaAppend,
    remove: mediaRemove
  } = useFieldArray({
    control,
    name: 'media'
  });

  const footerDialog = () => {
    return (
      <div>
        <Button
          label="Save Images"
          onClick={handleSubmit((data) => {
            updateProductImages(data.media, product.id)
              .then(() => {
                showToast('success', 'Success', 'Images updated successfully');
                hideDialog();
              })
              .catch((err) => {
                showToast('error', 'Error', 'Something went wrong while saving image.');
              });
          })}
        />
      </div>
    );
  };

  const onSelectedImages = (media: IMedia[]) => {
    media.forEach((img) => {
      mediaAppend({
        productId: product.id,
        order: images.length,
        imageAltText: '',
        comment: '',
        mediaId: img.id!,
        media: img
      });
    });
    setImageChooser(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Dialog maximizable={true} visible={productImageSelectionDialog} style={{ width: '50vw' }} header={`${product.name} Images (${mediaOnProducts?.length})`} footer={footerDialog} modal className="p-fluid" onHide={hideDialog}>
        <div>
          <div className="flex align-items-center justify-content-center border-1 border-round-2xl border-dashed" style={{ height: '200px' }} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
          </div>
          <Button label="Choose from existing images" onClick={() => setImageChooser(true)} />
          {mediaFields.map((field, index) => (
            <Card
              title={
                <div className="flex justify-content-between">
                  {`Product Image ` + (index + 1)}
                  <Button icon="pi pi-trash" severity="danger" type="button" onClick={() => mediaRemove(index)} />
                </div>
              }
              key={field.id}
              className="my-2"
            >
              <div className="grid gap-5">
                <Image preview className="shadow-2 flex-shrink-0 col-4" width={'100%'} src={field.media.fileUrl!} alt={field.imageAltText || ''} />
                <div className="col">
                  <div className="field mb-2">
                    <Controller
                      name={`media.${index}.order`}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Order is required.'
                        }
                      }}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <label htmlFor={field.name}>Order</label>
                            <InputNumber
                              placeholder="Order"
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
                  <div className="field mb-2">
                    <Controller
                      name={`media.${index}.imageAltText`}
                      control={control}
                      rules={
                        {
                          // required: {
                          //   value: true,
                          //   message: 'Alt Text is required.'
                          // }
                        }
                      }
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <label htmlFor={field.name}>Alt Text</label>
                            <InputText
                              placeholder="Alt Text"
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
                  <div className="field mb-2">
                    <Controller
                      name={`media.${index}.comment`}
                      control={control}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <label htmlFor={field.name}>Comments</label>
                            <InputTextarea
                              rows={5}
                              placeholder="Comments"
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
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Dialog>
      <ImageSelector imageChooser={imageChooser} hide={() => setImageChooser(false)} onSelectedImages={onSelectedImages} />
    </>
  );
};

export default ProductImageSelectionDialog;
