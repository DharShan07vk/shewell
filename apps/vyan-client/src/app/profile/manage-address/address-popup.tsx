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
        <AlertDialogTrigger>
          <div className="cursor-pointer rounded-md border border-dashed border-primary">
            <div
              className="flex h-full items-center justify-center text-lg font-medium text-black-400"
              onClick={() => setIsDialogOpen(true)}
            >
              {"+"} Add new address
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-[90vh] max-w-[1440px] max-h-screen w-[90%] overflow-y-auto lg:w-4/6 2xl:w-1/2">
          <AddressForm
            countries={countries}
            initialValues={emptyForm}
            onAddressCreated={handleAddressCreated}
          />

          <AlertDialogCancel
            className="absolute right-3 top-3"
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
                fill-opacity="0.4"
              />
            </svg>{" "}
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
