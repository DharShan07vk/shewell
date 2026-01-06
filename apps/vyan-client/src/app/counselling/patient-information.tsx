"use client";
import { Button } from "@repo/ui/src/@/components/button";
import AddPatient from "./edit-patient";
import { db } from "~/server/db";
import { getServerSession } from "next-auth";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import DeletePatient from "./delete-patient-user-action";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import AddNewPatient from "./add-new-patient";
import EditPatient from "./edit-patient";
import React from "react";

interface IPatientInformation {
  id: string;
  firstName: string;
  phoneNumber: string;
  email: string;
}

interface IPatientInformationProps {
  // onSelectPatient: (patient: IPatientInformation) => void;
  onSelectPatient: (patient: IPatientProps) => void;
  isActive: boolean;
  onNextStep: () => void;
  timeDuration: number;
  defaultDuration: number;
  // defaultSelectedPatient: IPatientInformation
  defaultSelectedPatient: IPatientProps;
  onSelectFinalPrice: (priceInCents: number) => void;
  onSelectCouple: (value: boolean) => void;
  expertId: string;
  defaultCouple: boolean;
}

interface IPatientProps {
  id: string;
  message?: string | null | undefined;
  firstName: string;
  lastName?: string | null | undefined;
  phoneNumber: string;
  email: string;
  additionalPatients: {
    firstName: string;
    lastName?: string | undefined | null;
    phoneNumber: string;
    message?: string | undefined | null;
    email: string;
    id: string;
    patientId: string | null;
  }[];
}

const PatientInformation = ({
  defaultSelectedPatient,
  defaultDuration,
  timeDuration,
  defaultCouple,
  onSelectPatient,
  onSelectFinalPrice,
  onSelectCouple,
  isActive,
  onNextStep,
  expertId,
}: IPatientInformationProps) => {
  // const [selectPatient, setSelectPatient] = useState<IPatientInformation>(
  //   defaultSelectedPatient
  // );
  const [selectPatient, setSelectPatient] = useState<IPatientProps | null>(
    defaultSelectedPatient,
  );
  const [isCouple, setIsCouple] = useState<boolean>(defaultCouple);
  const [openDialogEditPatient, setOpenDialogEditPatient] =
    useState<boolean>(false);
  const [openDialogAddNewPatient, setOpenDialogAddNewPatient] =
    useState<boolean>(false);

  const handleOnOpenDialogEditPatient = () => {
    setOpenDialogEditPatient(true);
  };

  const handleOnOpenDialogAddNewPatient = () => {
    setOpenDialogAddNewPatient(true);
  };

  const [selectedPatientId, setSelectedPatientId] = useState<string>();
  // calling an api to fetch patient-info based on the login user (not used await db.patient.find bcoz component has to render in client component)
  const { data, refetch } = api.searchPatient.searchPatient.useQuery(
    {},
    {
      refetchOnWindowFocus: true,
      enabled: true,
    },
  );

  console.log(
    "defaultCouple",
    defaultCouple,
    data?.patient[0]?.firstName,
    data?.patient[0]?.additionalPatients[0]?.firstName,
  );
  const { data: priceForSinlgle, refetch: refetchPrice } =
    api.findPrice.findPrice.useQuery({
      duration: timeDuration || defaultDuration,
      expertId: expertId,
      // couple: defaultCouple
    });
  const { data: priceForCouple, refetch: refetchPriceForCouple } =
    api.findPriceForCouple.findPriceForCouple.useQuery({
      duration: timeDuration || defaultDuration,
      expertId: expertId,
      // couple: defaultCouple
    });

  useEffect(() => {
    refetchPrice(), refetchPriceForCouple();
  }, [defaultCouple]);

  useEffect(() => {
    refetch();
  });

  useEffect(() => {
    if (data?.patient?.length === 1) {
      const singlePatient = data.patient[0];
      setSelectPatient(singlePatient!); // Set the single patient as selected
      onSelectPatient(singlePatient!); // Notify parent about the selected patient
    }
  }, [data?.patient, onSelectPatient]);

  const handleSelectPatient = (patient: IPatientProps) => {
    setSelectPatient(patient);
    onSelectPatient(patient);
  };

  const handleFinalPriceOnSelectingCouple = (item: IPatientProps) => {
    if (item.additionalPatients.length > 0) {
      onSelectCouple(true);
      onSelectFinalPrice(priceForCouple?.price?.priceInCentsForCouple!);
    } else {
      onSelectCouple(false);
      onSelectFinalPrice(priceForSinlgle?.price?.priceInCentsForSingle!);
    }
  };

  useEffect(() => {
    if (defaultCouple === true) {
      if (priceForCouple?.price) {
        onSelectFinalPrice(priceForCouple.price.priceInCentsForCouple);
      }
    } else {
      if (priceForSinlgle?.price) {
        onSelectFinalPrice(priceForSinlgle.price.priceInCentsForSingle);
      }
    }
  }, [defaultCouple]);

  const { toast } = useToast();

  const handleDeletePatient = (patientId: string) => {
    DeletePatient({ patientId })
      .then((resp) => {
        setSelectPatient(null)
        toast({
          title: resp?.message,
          variant: "default",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  };

  useEffect(() => {
    setIsCouple(isCouple)
    onSelectCouple(isCouple)
  },[isCouple])

  return (
    <>
      <div className="mb-6 flex flex-col gap-[6px] p-3 lg:mb-[30px] 2xl:mb-9">
        <div className="font-inter text-base font-medium text-active md:text-[20px] md:leading-[30px]">
          For whom you are booking the appointment?
        </div>
        <div className="font-inter text-sm font-normal text-[#656D78] xl:text-base">
          Are you booking this appointment for yourself, or for couple, or
          behalf or other person
        </div>
      </div>

      <div
        className={`flex flex-col gap-1 p-3 ${data?.patient.length! > 2 ? "h-[300px] overflow-y-scroll" : ""}`}
      >
        {data?.patient &&
          data?.patient.length > 0 &&
          data?.patient.map((item, index) => {
            return (
              <div onClick={() => {
                handleSelectPatient(item),
                handleFinalPriceOnSelectingCouple(item)
              } } className="flex w-full justify-between rounded-md border border-primary  p-3 lg:p-4 cursor-pointer">
                <div className="flex flex-col gap-[6px]">
                  <div
                    className="flex items-center gap-4
        "
                  >
                    <input
                      className="accent-primary"
                      type="radio"
                      checked={selectPatient?.id === item.id}
                      onChange={() => {
                        handleSelectPatient(item),
                          handleFinalPriceOnSelectingCouple(item);
                      }}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                      }}
                    />

                    <div className=" font-inter text-base font-normal text-[#383842] lg:text-base">
                      {/* {data?.patient?.firstName} */}
                      <div className="flex gap-2">
                        {item.firstName}

                        {item.additionalPatients.map(
                          (additionalPatient, index) => {
                            return (
                              <>
                                {"," +
                                  additionalPatient.firstName +
                                  (index < item.additionalPatients.length - 1
                                    ? ","
                                    : "")}
                              </>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 font-inter text-sm font-normal text-[#7F7F7F] lg:text-base">
                    Mobile :
                    <span className="flex gap-2">
                      {item.phoneNumber}
                      {/* {item.additionalPatients.length > 0 && ","} */}
                      {item.additionalPatients.map(
                        (additionalPatient, index) => {
                          return (
                            <>
                              {"," +
                                additionalPatient.phoneNumber +
                                (index < item.additionalPatients.length - 1
                                  ? ","
                                  : "")}
                            </>
                          );
                        },
                      )}

                      {/* {patient.phoneNumber} */}
                    </span>
                  </div>
                  <div className="font-inter text-sm font-normal text-[#7F7F7F] lg:text-base">
                    {/* {data?.patient?.email} */}
                    <div className="flex gap-2">
                      {item.email}
                      {item.additionalPatients.map(
                        (additionalPatient, index) => {
                          return (
                            <>
                              {"," +
                                additionalPatient.email +
                                (index < item.additionalPatients.length - 1
                                  ? ","
                                  : "")}
                            </>
                          );
                        },
                      )}{" "}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[40px]">
                  <div className="flex gap-6 items-center">
                    {item.additionalPatients.length > 0 ? <div className="font-inter py-1 px-[10px] text-[16px] leading-[24px] text-primary rounded-[6px] bg-[#E6F4F4]">Couple</div> : <div className="font-inter py-1 px-[10px] text-[16px] leading-[24px] text-primary rounded-[6px] bg-[#E6F4F4]">Single</div>}
                    <svg
                      onClick={() => {
                        handleOnOpenDialogEditPatient(),
                          setSelectedPatientId(item.id);
                      }}
                      cursor="pointer"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 16.6665H17.5"
                        stroke="#181818"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.75 2.91669C14.0815 2.58517 14.5312 2.39893 15 2.39893C15.2321 2.39893 15.462 2.44465 15.6765 2.53349C15.891 2.62233 16.0858 2.75254 16.25 2.91669C16.4142 3.08084 16.5444 3.27572 16.6332 3.4902C16.722 3.70467 16.7678 3.93455 16.7678 4.16669C16.7678 4.39884 16.722 4.62871 16.6332 4.84319C16.5444 5.05766 16.4142 5.25254 16.25 5.41669L5.83333 15.8334L2.5 16.6667L3.33333 13.3334L13.75 2.91669Z"
                        stroke="#181818"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg
                      className="cursor-pointer"
                      onClick={() => handleDeletePatient(item.id)}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_4153_55669)">
                        <path
                          d="M16.4453 2.98145H13.7598V2.44434C13.7598 1.55585 13.0369 0.833008 12.1484 0.833008H7.85156C6.96308 0.833008 6.24023 1.55585 6.24023 2.44434V2.98145H3.55469C2.6662 2.98145 1.94336 3.70429 1.94336 4.59277C1.94336 5.30634 2.40975 5.91267 3.05356 6.12393L4.01159 17.6888C4.08059 18.5173 4.78592 19.1663 5.61733 19.1663H14.3827C15.2141 19.1663 15.9194 18.5173 15.9885 17.6885L16.9464 6.12389C17.5902 5.91267 18.0566 5.30634 18.0566 4.59277C18.0566 3.70429 17.3338 2.98145 16.4453 2.98145ZM7.31445 2.44434C7.31445 2.14817 7.5554 1.90723 7.85156 1.90723H12.1484C12.4446 1.90723 12.6855 2.14817 12.6855 2.44434V2.98145H7.31445V2.44434ZM14.9179 17.5996C14.8949 17.8758 14.6598 18.0921 14.3827 18.0921H5.61733C5.34022 18.0921 5.10511 17.8758 5.08215 17.5999L4.13813 6.2041H15.8619L14.9179 17.5996ZM16.4453 5.12988H3.55469C3.25853 5.12988 3.01758 4.88894 3.01758 4.59277C3.01758 4.29661 3.25853 4.05566 3.55469 4.05566H16.4453C16.7415 4.05566 16.9824 4.29661 16.9824 4.59277C16.9824 4.88894 16.7415 5.12988 16.4453 5.12988Z"
                          fill="#DC2626"
                        />
                        <path
                          d="M7.85057 16.4476L7.31346 7.78222C7.29509 7.48613 7.03882 7.26094 6.74416 7.27938C6.44807 7.29775 6.22295 7.55262 6.24128 7.84868L6.77839 16.5141C6.79604 16.7989 7.03251 17.018 7.31396 17.018C7.62502 17.018 7.86965 16.756 7.85057 16.4476Z"
                          fill="#DC2626"
                        />
                        <path
                          d="M10.002 7.27832C9.70533 7.27832 9.46484 7.5188 9.46484 7.81543V16.4808C9.46484 16.7774 9.70533 17.0179 10.002 17.0179C10.2986 17.0179 10.5391 16.7774 10.5391 16.4808V7.81543C10.5391 7.5188 10.2986 7.27832 10.002 7.27832Z"
                          fill="#DC2626"
                        />
                        <path
                          d="M13.2559 7.27986C12.9605 7.26149 12.7049 7.48661 12.6866 7.7827L12.1495 16.4481C12.1312 16.7441 12.3563 16.999 12.6524 17.0174C12.9486 17.0357 13.2033 16.8105 13.2217 16.5145L13.7588 7.84916C13.7771 7.55307 13.552 7.29819 13.2559 7.27986Z"
                          fill="#DC2626"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4153_55669">
                          <rect
                            width="18.3333"
                            height="18.3333"
                            fill="white"
                            transform="translate(0.833984 0.833496)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="flex justify-between p-3">
        {
          <div
            onClick={() => handleOnOpenDialogAddNewPatient()}
            className="cursor-pointer rounded-md border border-primary px-5 py-2 font-inter text-base font-semibold text-primary"
          >
            + Add Patient
          </div>
        }
        <Button
          className="rounded-md bg-secondary font-inter text-base font-medium hover:bg-secondary"
          onClick={onNextStep}
          // disabled={!isActive}
          disabled={!selectPatient}
        >
          Next
        </Button>
      </div>

      <EditPatient
        patientId={selectedPatientId!}
        onOpenChange={setOpenDialogEditPatient}
        open={openDialogEditPatient}
        setIsCouple={setIsCouple}
      />
      <AddNewPatient
        onOpenChange={setOpenDialogAddNewPatient}
        open={openDialogAddNewPatient}
      />
    </>
  );
};
export default PatientInformation;
