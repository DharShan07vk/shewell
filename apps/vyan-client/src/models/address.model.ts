export type IAddress = {
  id: string;
  area: string;
  name: string;
  countryId: string;
  stateId: string;
  city: string;
  mobile: string;
  houseNo: string;
  landmark: string;
  pincode: string;
  addressType: string;
};
export type IAddressForm = {
  id?: string;
  area: string;
  name: string;
  countryId: string;
  stateId: string;
  city: string;
  mobile: string;
  houseNo: string;
  landmark: string;
  pincode: string;
  addressType: string;
};
// export type IAddressForm = Omit<IAddress, "id">;
