export type IBlogCategory = {
  id?: string;
  name: string;
  slug: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  // metaTitle: string | null;
  //   metaDescription: string | null;
  //   metaKeywords: string[];
};

export type IBlogCategoryForm = Omit<IBlogCategory, 'createdAt' | 'updatedAt'>;

export type IBlogCategorySelect = Omit<IBlogCategoryForm, 'slug' | 'active'>;
