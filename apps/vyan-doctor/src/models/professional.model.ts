export interface IProfessionalUser {
  firstName: string;
  qualification: string;
  avgRating: string;
  totalConsultations: string;
  specializedIn: IProfessionalSpecializations[];
};

export interface IProfessionalSpecializations {
  specialization: string;
};
