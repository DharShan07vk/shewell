// import { IMedia } from '@/src/_models/media.model';

// export type ITestimonial = {
//   id?: string;
//   title: string;
//   name: string;
//   body: string;
//   slug: string;
//   avgRating: string;
//   media: IMedia | null;
//   mediaId: string | null;
//   active: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// };

// export type ITestimonialForm = Omit<ITestimonial, 'createdAt' | 'updatedAt'>;


export type ITestimonial = {
  id: string;
  name: string;
  title: string;
  active: boolean;
  avgRating: string;
  mediaId:string|null;
  media: {
    id: string;
    fileUrl: string | null;
    mimeType: string | null;
  } | null;
};
