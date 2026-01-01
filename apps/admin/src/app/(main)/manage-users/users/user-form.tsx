import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Checkbox } from 'primereact/checkbox';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import SubmitButton from '@/src/_components/shared/submit-button';
import React, { useEffect, useRef } from 'react';
import { createUser, updateUser } from '@/src/app/(main)/manage-users/users/user-actions';
import useToastContext from '@/src/_hooks/useToast';
import { IUser } from '@/src/_models/user.model';

type IUserFormProps = {
  user: IUser;
  hideDialog: () => void;
};

const UserForm = ({ user, hideDialog }: IUserFormProps) => {
  const { showToast } = useToastContext();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isLoading, isSubmitted }
  } = useForm<IUser>({
    defaultValues: user
  });

  useEffect(() => {
    reset({ ...user });
  }, [user]);

  const callServerAction = (data: IUser) => {
    if (user?.id) {
      return updateUser(data);
    } else {
      return createUser(data);
    }
  };

  const submitForm = (data: IUser) => {
    return callServerAction(data)
      .then((resp) => {
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
        console.log(err);
      })
      .finally(() => {});
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} noValidate={true}>
        <input type="hidden" name="id" value={user?.id} />
        <div className="grid">
          <div className="field col-12 lg:col-4">
            <label htmlFor="name">First Name (Required*)</label>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'First Name is required.'
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
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                );
              }}
            />
          </div>
          <div className="field col-12 lg:col-4">
            <label htmlFor="name">Middle Name</label>
            <Controller
              name="middleName"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <InputText
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
          <div className="field col-12 lg:col-4">
            <label htmlFor="name">Last Name</label>
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <InputText
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
        </div>
        <div className="grid">
          <div className="field col-12 lg:col-4">
            <label htmlFor="email">Email (Required*)</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Email is required.'
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address. E.g. example@email.com'
                }
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <InputText
                      type="email"
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
          {!user?.id && (
            <div className="field col-12 lg:col-4">
              <label htmlFor="password">Password (Required*)</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Password is required.'
                  },
                  minLength: {
                    value: 8,
                    message: 'Password should be minimum 8 characters'
                  }
                }}
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <Password feedback={false} placeholder="Password" toggleMask className="w-full" inputClassName="w-full p-3" {...field}></Password>
                      {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                    </>
                  );
                }}
              />
            </div>
          )}
          <div className="field col-12">
            <Controller
              name="active"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <div className="flex gap-2 align-bottom">
                    <Checkbox checked={field.value} {...field} />
                    <label htmlFor="active">Active</label>
                  </div>
                );
              }}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <Button label="Cancel" type="reset" icon="pi pi-times" severity="danger" onClick={hideDialog} />
          <Button disabled={isLoading} type="submit" label="Save" icon="pi pi-check" />;
        </div>
      </form>
    </>
  );
};

export default UserForm;
