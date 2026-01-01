export type IProfessionalUser = {
  firstName: string;
  qualification: IProfessionalSpecializations;
  avgRating: string;
  totalConsultations: string;
  // specializedIn: IProfessionalSpecializations[];
};

export type IProfessionalSpecializations = {
  specialization: string;
}[];
