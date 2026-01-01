import { subDays } from 'date-fns';
import { loginShiprocket } from './auth';
import { PrismaClient } from "@repo/database"
export * from './auth';
export * from './order'
export * from './check-availability'

export const getAuthToken = async (shipRocketAuthKey: string) => {
  console.log("shipRocketAuthkey is",shipRocketAuthKey);
  const db = new PrismaClient();
  const oneWeekAgo = subDays(new Date(), 7);
  let appConfig = await db.appConfig.findUnique({
    where: {
      key: shipRocketAuthKey,
      updatedAt: {
        gt: oneWeekAgo,
      },
    },
  });

  console.log("appConfig is",appConfig);

  if (!appConfig) {
    try {
      const resp = await loginShiprocket();
      appConfig = await db.appConfig.upsert({
        where: {
          key: shipRocketAuthKey,
        },
        create: {
          key: shipRocketAuthKey,
          value: resp.token,
        },
        update: {
          value: resp.token,
        },
      });
    } catch (error) {
      return null;
    }
  }

  return appConfig.value;
}
