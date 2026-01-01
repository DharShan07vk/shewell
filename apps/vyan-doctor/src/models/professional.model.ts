export type IProfessionalUser = {
  firstName: string;
  qualification: string;
  avgRating: string;
  totalConsultations: string;
  specializedIn: IProfessionalSpecializations[];
};

export type IProfessionalSpecializations = {
  specialization: string;
};
