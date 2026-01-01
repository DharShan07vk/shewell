export type IBrand = {
  id: string | null;
  name: string;
  slug: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  mediaId: string | null;
  media: {
    id: string;
    fileUrl: string | null;
  } | null;
};
