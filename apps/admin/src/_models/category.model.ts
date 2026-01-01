export type ICategory = {
  id: string;
  name: string;
  active: boolean;
  slug: string;
  // order: number | null;
  parentCategory: {
    id: string;
    name: string;
  } | null;
  parentCategoryId: string | null;
  childCategories: ICategory[] | null;
  mediaId?: string;
  media?: {
    id: string;
    fileUrl: string;
  };
};
