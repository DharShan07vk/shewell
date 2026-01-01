export type ICountry = {
  id?: string;
  name: string;
  active: boolean;
  iso3: string;
  iso2: string;
  phoneCode: string;
  currency: string;
  currencyName: string;
  currencySymbol: string;
};

export type ICountrySelect = Omit<ICountry, 'active' | 'iso3' | 'iso2' | 'phoneCode' | 'currency' | 'currencySymbol' | 'currencyName'>;

export type ICountryWithStateSelect = ICountrySelect & {
  states: { id: string; name: string }[];
};
