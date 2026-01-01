import { IMedia } from '@/src/_models/media.model';

export type IBlog = {
  id?: string;
  title: string;
  author: string;
  body: string;
  slug: string;
  shortDescription:string | null;
  active: boolean;
  popularBlog: boolean | null;
  mediaId: string;
  media: IMedia | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  categoryId: string;
  category: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IBlogForm = Omit<IBlog, 'category' | 'createdAt' | 'updatedAt'>;
