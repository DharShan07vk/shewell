"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";

interface ISpecialization {
  value: string;
  label: string;
}
interface ISpecializationProps {
  specializations: ISpecialization[];
}
const SpecializationUserAction = async ({
  specializations,
}: ISpecializationProps) => {
  const session = await getServerSession();
  console.log("chek", session);

  try {
    // fetching professional user
    const professionalUser = await db.professionalUser.findUnique({
      where: {
        email: session?.user.email!,
      },
    });

    // check if professional user exists
    if (!professionalUser) {
      return {
        message: "Professional User do not exist",
      };
    }

    const specializationConnect = specializations.map((s) => ({
      id: s.value,
      specialization: s.label,
    }));

    await db.professionalUser.update({
      where: {
        id: professionalUser.id,
      },
      data: {
        ProfessionalSpecializations: {
          set: [],
        },
      },
    });

    // update the professional specializations corresponding to professionalUserId
    await db.professionalUser.update({
      where: {
        id: professionalUser.id,
      },
      data: {
        ProfessionalSpecializations: {
          connect: specializationConnect,
        },
      },
    });

    revalidatePath("/doctor-profile");
    return {
      message: "Successfully added the specialisations",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add specialization");
  }
};
export default SpecializationUserAction;
