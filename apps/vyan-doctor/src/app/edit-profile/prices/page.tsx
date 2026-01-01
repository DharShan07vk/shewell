import { db } from "~/server/db";
import PricesForm from "./prices-form";
import { getServerSession } from "next-auth";

const Prices = async () => {
  const session = await getServerSession();
  const professionalUser = await db.professionalUser.findUnique({
    where: {
      email: session?.user.email!,
    },
  });

  const prices = await db.professionalUser.findUnique({
    select: {
      professionalUserAppointmentPrices: {
        select: {
       
          priceInCentsForCouple: true,
          priceInCentsForSingle : true,
          time: true,
        },
      },
    },
    where: {
      id: professionalUser?.id,
    },
  });
  console.log("Prices", prices)
  return (
    <>
      <PricesForm
       prices={prices?.professionalUserAppointmentPrices!}
        />
    </>
  );
};
export default Prices;
