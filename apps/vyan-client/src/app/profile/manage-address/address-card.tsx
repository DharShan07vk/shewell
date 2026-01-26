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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@repo/ui/src/@/components/alert-dialog";
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
      <div className="relative rounded-xl border border-gray-100 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-6">
        <div className="flex gap-4">
          <div className="flex w-full flex-col gap-3">
            {/* div-1 */}
            <div>
              <div className="mb-1 font-poppins text-lg font-semibold text-[#181818]">
                {values.name}
              </div>
              <div className="flex flex-col gap-1 text-sm text-[#666666] lg:text-base">
                <div className="font-inter">
                  <span className="font-medium text-[#333333]">Mobile:</span>{" "}
                  {values.mobile}
                </div>
                <div className="font-inter">
                  {values.houseNo}, {values.area}, {values.city},{" "}
                  {values.pincode}
                </div>
              </div>
            </div>
            {/* div-2 */}
            <div className="mt-2 flex items-center gap-6">
              <AlertDialog open={isDialogOpen}>
                <AlertDialogTrigger>
                  <div
                    className="cursor-pointer font-poppins text-sm font-medium text-[#00898F] hover:underline"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Edit
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="h-[90vh] w-full overflow-y-auto lg:w-4/6 2xl:w-1/2">
                  <AddressForm
                    countries={countries}
                    initialValues={values}
                    onAddressCreated={handleAddressCreated}
                  />
                  <AlertDialogCancel
                    className="absolute right-3 top-3 border-none shadow-none hover:bg-transparent"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <svg
                      className="size-[13px] md:size-[15px]"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.0612 18.9387C21.343 19.2205 21.5013 19.6027 21.5013 20.0012C21.5013 20.3997 21.343 20.7819 21.0612 21.0637C20.7794 21.3455 20.3972 21.5038 19.9987 21.5038C19.6002 21.5038 19.218 21.3455 18.9362 21.0637L10.9999 13.125L3.0612 21.0612C2.7794 21.343 2.39721 21.5013 1.9987 21.5013C1.60018 21.5013 1.21799 21.343 0.936196 21.0612C0.654403 20.7794 0.496094 20.3972 0.496094 19.9987C0.496094 19.6002 0.654403 19.218 0.936196 18.9362L8.87494 11L0.938695 3.06122C0.656903 2.77943 0.498594 2.39724 0.498594 1.99872C0.498594 1.60021 0.656903 1.21802 0.938695 0.936225C1.22049 0.654432 1.60268 0.496123 2.0012 0.496123C2.39971 0.496123 2.7819 0.654432 3.0637 0.936225L10.9999 8.87497L18.9387 0.934975C19.2205 0.653182 19.6027 0.494873 20.0012 0.494873C20.3997 0.494873 20.7819 0.653182 21.0637 0.934975C21.3455 1.21677 21.5038 1.59896 21.5038 1.99747C21.5038 2.39599 21.3455 2.77818 21.0637 3.05997L13.1249 11L21.0612 18.9387Z"
                        fill="black"
                        fillOpacity="0.4"
                      />
                    </svg>{" "}
                  </AlertDialogCancel>
                </AlertDialogContent>
              </AlertDialog>

              <div
                className="cursor-pointer font-poppins text-sm font-medium text-red-500 hover:underline"
                onClick={deletehandler}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-5 top-5 rounded-lg bg-gray-100 px-3 py-1 font-inter text-xs font-medium text-gray-600">
          {values.addressType}
        </div>
      </div>
    </>
  );
}
