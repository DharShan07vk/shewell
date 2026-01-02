import { SessionStatus, SessionType } from '@repo/database';

export interface ISession {
  id?: string;
  title: string;
  slug: string;
  startAt: Date;
  endAt: Date;
  price: number; // Decimal in schema, number in TS usually ok, or string/Decimal type
  status: SessionStatus;
  categoryId: string;

  // New fields for enhancements
  thumbnailMediaId?: string | null;
  bannerMediaId?: string | null;
  overview?: string | null;
  meetingLink?: string | null;
  language?: string;
  type?: SessionType;

  // UI-only field for duration-based creation (not stored in DB)
  duration?: number; // in minutes

  createdAt?: Date;
  updatedAt?: Date;
}
