export type IGymMembership = {
  id?: string;
  name: string;
  amountInCents: number;
  monthsInPlan: number;
  discount: number | null;
  active: boolean;
  features: { name: string }[];
  createdAt: Date;
  updatedAt: Date;
};

export type IGymMembershipForm = Omit<IGymMembership, 'createdAt' | 'updatedAt'>;
