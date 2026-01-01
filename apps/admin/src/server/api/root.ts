import { createTRPCRouter } from '@/src/server/api/trpc';
import { mediaRouter } from '@/src/server/api/routers/media';
import { noOfOnlineAppointmentsRouter } from './routers/dashboard-data-for-date-range';
import { totalOnlineAppointmentsRouter } from './routers/total-appointments';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  mediaRouter: mediaRouter,
  noOfOnlineAppointments: noOfOnlineAppointmentsRouter,
  totalOnlineAppointments : totalOnlineAppointmentsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
