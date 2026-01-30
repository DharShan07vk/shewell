'use server';

import { db } from '@/src/server/db';
import HomepageBannersTable from '@/src/app/(main)/manage-blogs/homepage-banners/homepage-banners-table';

// Force dynamic rendering to prevent caching of database queries
export const dynamic = 'force-dynamic';

const HomepageBannerPage = async () => {
  const homepageBanners = await db.homeBanner.findMany({
    select: {
      id: true,
      order: true,
      url: true,
      active: true,
      mediaId: true,
      media: true,
      usedFor : true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      order: 'asc'
    }
  });

  return <HomepageBannersTable homepageBanners={homepageBanners} />;
};

export default HomepageBannerPage;
