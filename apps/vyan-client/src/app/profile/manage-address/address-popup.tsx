"use client";

import AddressCard from "./address-card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
} from "@repo/ui/src/@/components/alert-dialog";
import AddressForm from "./address-form";
import { IAddress, IAddressForm } from "~/models/address.model";
import { useState } from "react";
import { useCartStore } from "~/store/cart.store";
type IAddressPopUp = {
  countries: { id: string; name: string }[];
  addedAddresses: IAddress[];
};
export default function AddressPopUp({
  countries,
  addedAddresses,
}: IAddressPopUp) {
  const emptyForm: IAddressForm = {
    id: "",
    area: "",
    name: "",
    countryId: "",
    stateId: "",
    city: "",
    houseNo: "",
    mobile: "",
    landmark: "",
    pincode: "",
    addressType: "",
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { cart, setAddress } = useCartStore((state) => {
    console.log("state is ", state);
    return {
      cart: state.cart,
      setAddress: state.setAddress,
    };
  });
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(
    cart.address || null,
  );

  const handleAddressCreated = () => {
    setIsDialogOpen(false);
  };
  const handleSelect = (item: IAddress) => {
    setAddress(item);
    console.log("now the selected address is", item);
    console.log("finalllly", cart);
    setSelectedAddress(item);
  };
  return (
    <>
      {addedAddresses.map((item) => (
        <div
          onClick={() => handleSelect(item)}
          className={`cursor-pointer ${selectedAddress?.id === item.id ? "bg-[#DFF1F2]" : ""}`}
        >
          <AddressCard key={item.id} values={item} countries={countries} />
        </div>
      ))}
      {/* <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer rounded-md border border-dashed border-primary">
            <div className="flex h-full items-center justify-center text-lg font-medium text-black-400">
              {"+"} Add new address
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-11/12 p-[54px] lg:w-9/12 xl:w-1/2">
          <AddressForm countries={countries} initialValues={emptyForm} />
        </DialogContent>
      </Dialog> */}

      <AlertDialog open={isDialogOpen}>
        <AlertDialogTrigger asChild>
          <div className="cursor-pointer rounded-xl border border-dashed border-[#00898F] bg-[#F2F7EA] p-6 transition-all hover:bg-[#e6f0db]">
            <div
              className="flex h-full items-center justify-center gap-2 text-lg font-medium text-[#00898F]"
              onClick={() => setIsDialogOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="#00898F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add new address
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-[90vh] max-h-screen w-[95%] max-w-[800px] overflow-y-auto rounded-3xl p-0 lg:w-4/6 2xl:w-1/2">
          <div className="p-6 md:p-10">
            <div className="mb-6 flex items-center justify-between">
              <div className="font-poppins text-2xl font-semibold text-[#181818]">
                Add New Address
              </div>
              <AlertDialogCancel
                className="border-none shadow-none hover:bg-transparent"
                onClick={() => setIsDialogOpen(false)}
              >
                <svg
                  className="size-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#181818"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </AlertDialogCancel>
            </div>
            <AddressForm
              countries={countries}
              initialValues={emptyForm}
              onAddressCreated={handleAddressCreated}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
