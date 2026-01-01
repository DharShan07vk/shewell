import { IMedia } from '@/src/_models/media.model';
import { HomeBannerType } from '@repo/database';

export type IHomepageBanner = {
  id?: string;
  order: number;
  url: string | null;
  active: boolean;
  mediaId: string | null;
  media: IMedia | null;
  createdAt: Date;
  updatedAt: Date;
  usedFor : HomeBannerType
};

export type IHomepageBannerForm = Omit<IHomepageBanner, 'createdAt' | 'updatedAt'>;
