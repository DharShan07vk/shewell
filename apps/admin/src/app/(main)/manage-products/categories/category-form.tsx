import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import SubmitButton from '@/src/_components/shared/submit-button';
import React, { useEffect, useRef, useState } from 'react';
import { createCategory, updateCategory } from '@/src/app/(main)/manage-products/categories/category-actions';
import useToastContext from '@/src/_hooks/useToast';
import { ICategory } from '@/src/_models/category.model';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { Image } from 'primereact/image';
import uploadProductImage from '@/src/app/(main)/upload-image-actions';
import { slugifyName } from '@/src/lib/utils';

type CategoryFormProps = {
  category: ICategory;
  categories: {
    id: string;
    name: string;
    active: boolean;
    slug: string;
    // order: number
  }[];
  hideDialog: () => void;
};

const CategoryForm = ({ category, categories, hideDialog }: CategoryFormProps) => {
  const fileInputRef = useRef<FileUpload>(null);
  const [uploadingState, setUploadingState] = useState<0 | 1 | 2>(0);
  const [imageUrl, setImageUrl] = useState<string>();
  const { showToast } = useToastContext();
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { isLoading }
  } = useForm<ICategory>({
    defaultValues: category
  });

  useEffect(() => {
    reset({ ...category });
  }, [category]);

  const callServerAction = (data: ICategory) => {
    if (category?.id) {
      return updateCategory(data);
    } else {
      return createCategory(data);
    }
  };

  const submitForm = (data: ICategory) => {
    return callServerAction(data)
      .then((resp) => {
        // if (resp.error) {
        //   showToast('error', 'Error', resp.error);
        // }
        if (resp.message) {
          showToast('success', 'Successful', resp.message);
          hideDialog();
        }
      })
      .catch((err) => {
        showToast('error', 'Error', err.message);
        console.log(err);
      })
      .finally(() => {});
  };

  const onSelectImage = async (event: FileUploadSelectEvent) => {
    if (event.files.length > 0) {
      event.files.forEach((image) => {
        setUploadingState(1);
        uploadProductImage(image.name, image.type)
          .then(async (resp) => {
            const { id, fileUrl, presignedUrl } = resp;
            const requestOptions = {
              method: 'PUT',
              body: image
            };
            const res = await fetch(presignedUrl!, requestOptions);
            console.log(res, presignedUrl, id);
            if (res.ok) {
              setValue('mediaId', id);
              setImageUrl(fileUrl);
              fileInputRef.current?.clear();
            }
          })
          .catch(() => {
            fileInputRef.current?.clear();
          });
      });
    }
  };

  const watchedName = watch('name');
  const slug = slugifyName(watchedName);

  useEffect(() => {
    setValue('slug', slug);
  }, [watchedName]);
  const errorHandler = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitForm, errorHandler)} noValidate={true}>
        <input type="hidden" name="id" value={category?.id} />
        {category.media && category.media.fileUrl && !imageUrl && <Image src={category.media.fileUrl} alt="Image" className="relative" width="100" height="auto" preview />}
        {imageUrl && <Image src={imageUrl} alt="Image" className="relative" width="100" height="auto" preview />}
        <div className="field mb-2">
          <FileUpload ref={fileInputRef} mode="basic" accept="image/*" maxFileSize={1000000} onSelect={onSelectImage} />
        </div>
        {/*<div className="flex gap-2">*/}
        {/*  /!*<Button label="Select" icon="pi pi-images" className="p-button-success" onClick={(e) => op.current?.toggle(e)} />*!/*/}
        {/*  /!*<OverlayPanel ref={op}>*!/*/}
        {/*  /!*  <img src="/" alt="Bamboo Watch"></img>*!/*/}
        {/*  /!*</OverlayPanel>*!/*/}
        {/*  <FileUpload mode="basic" url="/api/upload" accept="image/*" chooseLabel="Upload from Computer" maxFileSize={1000000} onUpload={onUpload} className="w-1/2" />*/}
        {/*</div>*/}
        <div className="field">
          <label htmlFor="name">Name</label>
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
          <label htmlFor="slug">Slug</label>
          <Controller
            name="slug"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <InputText
                    type="text"
                    className={classNames({
                      'p-invalid': fieldState.error
                    })}
                    {...field}
                    value={field.value || ''}
                    // onChange={(e) => field.onChange(e.target.value)}
                  />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div>

        {/* <div className="field">
          <label htmlFor="order">Order</label>
          <Controller
            name="order"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <InputText
                    type="number"
                    className={classNames({
                      'p-invalid': fieldState.error
                    })}
                    {...field}
                    value={field.value?.toString()}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              );
            }}
          />
        </div> */}

        <div className="field">
          <label htmlFor="parentCategoryId">Parent Category</label>
          <Controller
            name="parentCategoryId"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Dropdown
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    options={categories}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Select parent category"
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
          <Controller
            name="active"
            control={control}
            render={({ field }) => {
              {console.log("field.value",field.value)}
              return (
                <div className="flex gap-2">
                  <Checkbox checked={field.value} {...field} onChange={(e)=>setValue("active",e.checked!!)}/>
                   
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
    </>
  );
};

export default CategoryForm;
