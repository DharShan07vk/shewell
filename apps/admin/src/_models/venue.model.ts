import { IMedia } from '@/src/_models/media.model';

export type IVenueWorkingTimeSlot = {
  id: string;
  weekDay: 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';
  from: string;
  till: string;
  slotDurationInMinutes: number;
  slotPrice: number;
};

export type IVenue = {
  id: string;
  name: string;
  slug: string;
  stateId: string;
  state: {
    id: string;
    name: string;
  };
  countryId: string;
  country: {
    id: string;
    name: string;
  };
  amenityIds: string[];
  amenities: {
    id: string;
    name: string;
  }[];
  gameVenues: {
    noOfCourts: number;
    gameId: string;
  }[];
  venueBlockDates: {
    id: string;
    blockedAt: Date;
  }[];
  venueWorkingTimeSlots: IVenueWorkingTimeSlot[];
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  mediaOnVenues: IMediaOnVenue[];
  streetAddress: string | null;
  latitude: string | null;
  longitude: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IMediaOnVenue = {
  order: number;
  imageAltText: string | null;
  comment: string | null;
  venueId: string;
  mediaId: string;
  media: IMedia;
};

export type IVenueForm = Omit<IVenue, 'state' | 'country' | 'createdAt' | 'updatedAt'>;
