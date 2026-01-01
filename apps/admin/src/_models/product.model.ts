import { IMedia } from '@/src/_models/media.model';

export type ICurrency = {
  id: string;
  name: string;
  symbol: string;
};
export type FAQ={
  id:string;
  question:string;
  answer:string;
  order:number;
}
export type IProduct = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  active: boolean;
  bestSeller: boolean;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  } | null;
  productBenefits: IProductBenefit[];
  // productStats: IProductStats[];
  productVariants: IProductVariant[];
  media: {
    order: number;
    imageAltText: string | null;
    comment: string | null;
    mediaId: string;
    productId: string;
    media: {
      id: string;
      fileUrl: string | null;
      fileKey: string;
    };
  }[]| null;
  createdAt?: Date;
  updatedAt?: Date;
  faq : FAQ[];
  // veg: boolean | null;
};

export type IProductForm = Omit<IProduct, 'avgRating' | 'totalReviews' | 'category' | 'createdAt' | 'updatedAt'>;

export type IProductBenefit = {
  id: string | null;
  benefit: string;
};
//
// export type IProductStats = {
//   id: string | null;
//   title: string;
//   stat: string;
// };

export type IProductVariant = {
  id: string | null;
  name: string;
  priceInCents: number;
  isPercentage: boolean | null;
  discountInCents: number | null;
  discountInPercentage: number | null;
  discountEndDate: Date | null;
  // productVariantPrices: IProductVariantPrice[];
};

export type IProductVariantInventory = {
  id: string | null;
  available: number;
  onHand: number;
  damaged: number;
  qualityControl: number;
  safetyStock: number;
  other: number;
  commited: number;
};

export type IMediaOnProducts = {
  order: number;
  imageAltText: string | null;
  comment: string | null;
  productId: string;
  mediaId: string;
  media: IMedia;
};
