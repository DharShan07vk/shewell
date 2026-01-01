"use client";
type ICard = {
  values: IAddressForm;
  // defaultAddressId: string;
  // setDefaultAddress: (addressId: string) => void;
  countries: { id: string; name: string }[];
};
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@repo/ui/src/@/components/dialog";
import { Button } from "@repo/ui/src/@/components/button";

import { toast } from "@repo/ui/src/@/components/use-toast";
import AddressForm from "./address-form";
import { IAddressForm } from "~/models/address.model";
import { useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@repo/ui/src/@/components/alert-dialog";
import { deleteAddress } from "./address-actions";
export default function AddressCard({
  values,
  countries,
  // defaultAddressId,
  // setDefaultAddress,
}: ICard) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddressCreated = () => {
    setIsDialogOpen(false); 
  };
  const deletehandler = () => {
    deleteAddress(values.id!).then((resp) => {
      if (resp.error) {
        return toast({
          variant: "destructive",
          title: resp.error,
        });
      } else if (resp.message) {
        return toast({
          variant: "default",
          title: resp.message,
        });
      }
    });
  };

 
  return (
    <>
          <div className="relative rounded-md border border-primary p-2 md:p-5">
        <div className="flex gap-2">
          <div className="flex flex-col gap-[10px]">
            {/* div-1 */}
            <div>
              <div className="mb-1 font-inter font-medium text-black-500">
                {values.name}
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="font-inter text-sm font-normal text-inactive lg:text-base">
                  {`Mobile : ${values.mobile}`}
                </div>
                <div className="font-inter text-sm font-normal text-inactive lg:text-base">
                  {values.area + values.pincode}
                </div>
              </div>
            </div>
            {/* div-2 */}
            <div className="flex items-center gap-6">

              <AlertDialog open={isDialogOpen}>
        <AlertDialogTrigger>
        <div className="cursor-pointer text-lg font-normal text-active" onClick={()=>setIsDialogOpen(true)}>
                    Edit
                  </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="overflow-y-auto h-[90vh] w-full lg:w-4/6 2xl:w-1/2">
          <AddressForm
            countries={countries}
            initialValues={values}
            onAddressCreated={handleAddressCreated}
          />
           <AlertDialogCancel className="absolute right-3 top-3" onClick={()=>setIsDialogOpen(false)}>
           <svg className="md:size-[15px] size-[13px]" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.0612 18.9387C21.343 19.2205 21.5013 19.6027 21.5013 20.0012C21.5013 20.3997 21.343 20.7819 21.0612 21.0637C20.7794 21.3455 20.3972 21.5038 19.9987 21.5038C19.6002 21.5038 19.218 21.3455 18.9362 21.0637L10.9999 13.125L3.0612 21.0612C2.7794 21.343 2.39721 21.5013 1.9987 21.5013C1.60018 21.5013 1.21799 21.343 0.936196 21.0612C0.654403 20.7794 0.496094 20.3972 0.496094 19.9987C0.496094 19.6002 0.654403 19.218 0.936196 18.9362L8.87494 11L0.938695 3.06122C0.656903 2.77943 0.498594 2.39724 0.498594 1.99872C0.498594 1.60021 0.656903 1.21802 0.938695 0.936225C1.22049 0.654432 1.60268 0.496123 2.0012 0.496123C2.39971 0.496123 2.7819 0.654432 3.0637 0.936225L10.9999 8.87497L18.9387 0.934975C19.2205 0.653182 19.6027 0.494873 20.0012 0.494873C20.3997 0.494873 20.7819 0.653182 21.0637 0.934975C21.3455 1.21677 21.5038 1.59896 21.5038 1.99747C21.5038 2.39599 21.3455 2.77818 21.0637 3.05997L13.1249 11L21.0612 18.9387Z" fill="black" fill-opacity="0.4"/>
</svg> </AlertDialogCancel>
        </AlertDialogContent>
       
      </AlertDialog>

              {/* </div> */}
              <div
                className="cursor-pointer font-inter text-lg  font-normal text-red-500"
                onClick={deletehandler}
              >
                Delete
              </div>

              {/* {showDefault && (
                <div
                  className="cursor-pointer text-lg font-normal text-active"
                  onClick={defaultHandler}
                >
                  Set as default
                </div>
              )} */}
            </div>
          </div>
        </div>
        <Button className="absolute right-5 top-5">{values.addressType}</Button>
      </div>
    </>
  );
}
