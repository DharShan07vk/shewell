'use server';
import React, { Suspense } from 'react';
import { db } from '@/src/server/db';

import { Skeleton } from 'primereact/skeleton';
import SpecializationTable from './specialization-parent-category-table';
import SpecializationParentCategoryTable from './specialization-parent-category-table';

// Force dynamic rendering to prevent caching of database queries
export const dynamic = 'force-dynamic';

const SpecializationParentCategoryPage = async () => {
  //   const specializations = await db.professionalSpecializations.findMany({
  //     select: {
  //       id: true,
  //       specialization: true,
  //       active: true
  //     },
  //     orderBy: [
  //       {
  //         specialization: 'asc'
  //       }
  //     ]
  //   });

  const specializations = await db.professionalSpecializationParentCategory.findMany({
    select: {
      id: true,
      name: true,
      active: true,
      media: true,
      mediaId: true
    },
    orderBy: [
      {
        name: 'asc'
      }
    ]
  });

  return (
    <Suspense fallback={<Skeleton width="100%" height="100px" />}>
      <SpecializationParentCategoryTable specializations={specializations} />
    </Suspense>
  );
};

export default SpecializationParentCategoryPage;
