export type IUser = {
  id?: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  accountType: 'normal' | 'facebook' | 'google' | 'apple';
  active: boolean;
  password?: string;
};
