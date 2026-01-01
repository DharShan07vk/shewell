import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import SubmitButton from '@/src/_components/shared/submit-button';
import React, { useEffect, useState } from 'react';
import useToastContext from '@/src/_hooks/useToast';
import { ICountryWithStateSelect } from '@/src/_models/country.model';
import { IPincodeForm } from '@/src/_models/pincode.model';
import { createPincode, updatePincode } from '@/src/app/(main)/manage-locations/pincodes/pincode-actions';
import { Dropdown } from 'primereact/dropdown';

type CurrencyFormProps = {
  pincode: IPincodeForm;
  countries: ICountryWithStateSelect[];
  hideDialog: () => void;
};

const PincodeForm = ({ pincode, countries, hideDialog }: CurrencyFormProps) => {
  const { showToast } = useToastContext();
  const [selectedCountry, setSelectedCountry] = useState<ICountryWithStateSelect>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isLoading }
  } = useForm<IPincodeForm>({
    defaultValues: pincode
  });

  useEffect(() => {
    reset({ ...pincode });
  }, [pincode]);

  const callServerAction = (data: IPincodeForm) => {
    if (pincode?.id) {
      return updatePincode(data);
    } else {
      return createPincode(data);
    }
  };

  const submitForm = (data: IPincodeForm) => {
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
        <input type="hidden" name="id" value={pincode?.id!} />
        <div className="field">
          <label htmlFor="name">Pincode</label>
          <Controller
            name="pincode"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Pincode is required.'
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
        <div className="field">
          <label htmlFor="countryId">Country</label>
          <Dropdown
            filter
            options={countries}
            optionLabel="name"
            // optionValue="id"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="stateId">State</label>
          <Controller
            name="stateId"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'State is required.'
              }
            }}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Dropdown
                    filter
                    options={selectedCountry?.states}
                    optionLabel="name"
                    optionValue="id"
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
        <div className="flex flex-row gap-4">
          <Button label="Cancel" type="reset" icon="pi pi-times" severity="danger" onClick={hideDialog} />
          <SubmitButton label="Save" icon="pi pi-check" />
        </div>
      </form>
    </>
  );
};

export default PincodeForm;
