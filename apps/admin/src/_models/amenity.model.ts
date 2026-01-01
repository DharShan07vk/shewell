export type IAmenity = {
  id: string | null;
  name: string;
  mediaId: string | null;
  media: {
    id: string;
    fileUrl: string | null;
  } | null;
};
