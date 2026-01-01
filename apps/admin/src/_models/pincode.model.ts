export type IPincode = {
  id?: string;
  pincode: string;
  stateId: string | null;
  state: {
    id: string;
    name: string;
    country: {
      id: string;
      name: string;
    };
  } | null;
};

export type IPincodeForm = Omit<IPincode, 'state'>;
