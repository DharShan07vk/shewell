
import { db } from "~/server/db";
import QualificationForm from "./qualification-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Qualification = async () => {
  const states = await db.state.findMany({
    select: {
      id: true,
      name: true,
      // cities: true,
    },
    where :{
      country : {
        active : true
      }
    },
  });

  const specialisations = await db.professionalSpecializations.findMany({
    select: {
      id: true,
      specialization: true,
    },
    where: {
      active: true
    }
  });
  const session = await getServerSession();
  console.log("session", session);

  const professionalUser = await db.professionalUser.findFirst({
    where: {
      email: session?.user.email!,
    },
  });

  const experience = await db.professionalExperience.findFirst({
    select: {
      startingYear: true,
      endingYear: true,
      department: true,
      location: true,
      position: true,
    },
    where: {
      professionalUserId: professionalUser?.id,
    },
  });

  const degree = await db.professionalDegree.findFirst({
    select: {
      degree: true,
    },
    where: {
      professionalUserId: professionalUser?.id,
    },
  });

  const languages = await db.professionalLanguages?.findMany({
    select: {
      id: true,
      language: true,
    },
    where: {
      professionalUsers: {
        some: {
          id: professionalUser?.id,
        },
      },
      active: true
    },
  });

  const languagesOptions = await db.professionalLanguages.findMany({
    select: {
      id: true,
      language: true,
    }
  })
  const stateandCityId = await db.professionalQualifications.findFirst({
    select: {
      city: true,
      stateId: true,
      cityId: true,
    },
    where: {
      professionalUserId: professionalUser?.id,
    },
  });
  console.log("languages", languages)
  const formattedDefaultLanguages = languages.map((item) => ({
    id: item.id,
    name: item.language,
  }));

  const formattedLanguagesOptions = languagesOptions.map((item) => ({
    id: item.id,
    name: item.language
  }))

  console.log("cityId", stateandCityId?.cityId);
  const formattedStates = states.map((item) => ({
    id : item.id,
    name : item.name
  }))
  console.log("states", formattedStates)
  return (
    <>
      <QualificationForm
        specialisations={specialisations.map((a) => ({
          value: a.id,
          label: a.specialization,
        }))}
        states={formattedStates}
        defaultLanguages={formattedDefaultLanguages}
        degree={degree?.degree!}
        defaultStateId={stateandCityId?.stateId!}
        stateId={stateandCityId?.stateId!}
        city={stateandCityId?.city!}
        defaultCity={stateandCityId?.city!}
        gender={professionalUser?.gender!}
        startingYear={experience?.startingYear!}
        endingYear={experience?.endingYear!}
        department={experience?.department!}
        position={experience?.position!}
        location={experience?.location!}
        languagesOptions={formattedLanguagesOptions}
        displayQualificationId={professionalUser?.displayQualificationId!}
      />
    </>
  );
};

export default Qualification;
