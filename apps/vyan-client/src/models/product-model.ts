import { IReview } from "./review.model";

export type IProductMedia = {
  media: {
    // fileKey: string;
    fileUrl: string | null;
  };
};

export type IProductVariant = {
  id: string;
  name: string;
  priceInCents: number;
  discountInCents: number | null;
  discountInPercentage: number | null;
  discountEndDate: Date | null;
  productVariantInventory?: {
    id: string;
    available: number;
    productVariantId: string;
  } | null;
};
export type IProductBenefit = {
  id: string | null;
  benefit: string;
};
export type IProduct = {
  id: string;
  name: string;

  shortDescription: string;
  description: string;
  avgRating: string;
  totalReviews: number;
  slug: string;
  categoryId: string;
  userWishlisted?: {
    email: string;
  }[];
  // review :IReview[]
  review: {
    id: string;
    review: string;
    rating: string;
  }[];
  media: IProductMedia[];
  productBenefits : IProductBenefit[];
  productVariants: IProductVariant[];
  deletedAt?: Date | null;
  faq: {
    id: string;
    question: string;
    answer: string;
    order: number;
  }[];
};

export type IProductVariantPrices = {
  currency: {
    name: string;
  };
  priceInCents: number | null;
  discountInCents: number | null;
  discountInPercentage: number | null;
};

// export type IProduct = {
//   id: string;
//   name: string;
//   shortDescription: string;
//   description: string;
//   slug: string;
//   userWishlisted: {
//     email: string;
//   }[];
//   mediaOnProducts: IProductMedia[];
//   productVariants: IProductVariant[];
// };
