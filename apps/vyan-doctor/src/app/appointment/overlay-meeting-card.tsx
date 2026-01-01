"use client";
import { Button } from "@repo/ui/src/@/components/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@repo/ui/src/@/components/sheet";
import { format, isAfter } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import CancelAppointment from "../actions/cancel-appointment";
import { useToast } from "@repo/ui/src/@/components/use-toast";
import { BookAppointmentStatus } from "@repo/database";
import { differenceInMinutes } from "date-fns";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@repo/ui/src/@/components/checkbox";
import CompleteAppointment from "../actions/complete-appointment";
import DoctorCommentForm from "./doctor-comment-form";
import { api } from "~/trpc/react";
import React from "react";
import Link from "next/link";
type IGoogleCalenderEvent = {
  kind: string; //'calendar#event',
  etag: string; //'"3451078320258000"',
  id: string; //'tlb9fhh1004jnpd99nog08c38k',
  status: string; //'confirmed',
  htmlLink: string; //'https://www.google.com/calendar/event?eid=dGxiOWZoaDEwMDRqbnBkOTlub2cwOGMzOGsgY29udGFjdEBuZXh0Zmx5dGVjaC5uZXQ',
  created: string; //'2024-09-05T12:26:00.000Z',
  updated: string; //'2024-09-05T12:26:00.129Z',
  summary: string; //'Tttttttttttt',
  creator: {
    email: string; //'contact@nextflytech.net'
    self: boolean; // true
  };
  organizer: {
    email: string; //email: 'contact@nextflytech.net',
    self: boolean; // true
  };
  start: {
    dateTime: string; // '2024-09-06T15:00:00+05:30',
    timeZone: string; // 'Asia/Kolkata'
  };
  end: {
    dateTime: string; // '2024-09-06T15:00:00+05:30',
    timeZone: string; // 'Asia/Kolkata'
  };
  iCalUID: string; // 'tlb9fhh1004jnpd99nog08c38k@google.com',
  sequence: number; // 0,
  hangoutLink: string; // 'https://meet.google.com/one-prnw-mre',
  conferenceData: {
    createRequest: {
      requestId: string; // 'sample123',
      conferenceSolutionKey: unknown; // [Object],
      status: unknown; // [Object]
    };
    entryPoints: unknown[]; // [ [Object], [Object], [Object] ],
    conferenceSolution: {
      key: unknown[]; // [Object],
      name: string; // 'Google Meet',
      iconUri: string; // 'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png'
    };
    conferenceId: string; // 'one-prnw-mre'
  };
  reminders: {
    useDefault: boolean; // true
  };
  eventType: string; // 'default'
  attachments: [
    {
      fileUrl: string;
      title: string;
      mimeType: string;
      iconLink: string;
      fileId: string;
    },
  ];
};
type IMeetingDetails = {
  meetingInfo: {
    id: string;
    professionalUser: {
      displayQualification: {
        specialization: string;
      } | null;
    };
    patient: {
      id: string;
      firstName: string;
    };
    startingTime: Date;
    endingTime: Date;
    status: BookAppointmentStatus | null;
    meeting: IGoogleCalenderEvent;
  };
};
const MeetingCard = ({ meetingInfo }: IMeetingDetails) => {
  const trpcContext = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const currentTime = new Date();
  const { toast } = useToast();

  if (!meetingInfo) {
    return;
  }
  const { data } = api.searchComments.searchComments.useQuery({
    bookAppointmentId: meetingInfo.id,
    patientId: meetingInfo.patient.id,
  });

  console.log("meetingDetails", meetingInfo.meeting?.hangoutLink);
  const handleCancelAppointment = async (appointmentId: string) => {
    await CancelAppointment({ appointmentId })
      .then((resp) => {
        toast({
          title: resp?.message,
          variant: "default",
        });
        console.log("book appointment", resp?.message);
        trpcContext.invalidate();
        setClose(false);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      });
  };

  const schema = z.object({
    completed: z.boolean(),
  });

  const { handleSubmit, control } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const [close, setClose] = useState<boolean>();
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("data", data);
    CompleteAppointment({ appointmentId: meetingInfo.id })
      .then((resp) => {
        toast({
          description: resp.message,
          variant: "default",
        });
        trpcContext.invalidate();
        setClose(false);
      })
      .catch((err) => {
        toast({
          description: err.message,
          variant: "destructive",
        });
      });
  };

  console.log("data", data?.patientHistory);
  return (
    <>
      <Sheet open={close} onOpenChange={setClose}>
        <SheetTrigger className="p-1">
          <svg
            width="4"
            height="17"
            viewBox="0 0 4 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4.97266C3.1 4.97266 4 4.07266 4 2.97266C4 1.87266 3.1 0.972656 2 0.972656C0.9 0.972656 0 1.87266 0 2.97266C0 4.07266 0.9 4.97266 2 4.97266ZM2 6.97266C0.9 6.97266 0 7.87266 0 8.97266C0 10.0727 0.9 10.9727 2 10.9727C3.1 10.9727 4 10.0727 4 8.97266C4 7.87266 3.1 6.97266 2 6.97266ZM2 12.9727C0.9 12.9727 0 13.8727 0 14.9727C0 16.0727 0.9 16.9727 2 16.9727C3.1 16.9727 4 16.0727 4 14.9727C4 13.8727 3.1 12.9727 2 12.9727Z"
              fill="#434343"
            />
          </svg>
        </SheetTrigger>

        <SheetContent side="signup" className="bg-white p-0">
          <div className="w-full">
            <div className=" border-b ">
              <div className="xs:px-[10px] sm:px-[40px] py-[30px]">
                {/* heading */}
                <div className="flex justify-between  ">
                  <div className=" font-poppins xs:text-[25px] text-[36px] font-bold leading-[45px] text-active">
                    Client Meeting
                  </div>
                  <SheetClose>
                    <svg
                      width="30"
                      height="50"
                      viewBox="0 0 23 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.3984 8.45703L8.19665 15.4319"
                        stroke="#008F4E"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.8125 8.84375L14.7874 15.0455"
                        stroke="#008F4E"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </SheetClose>
                </div>
              </div>
            </div>
            <div className="xs:px-[10px] sm:px-10">
              {/* meeting-with */}

              <div className="flex flex-col gap-[10px] border-b border-primary py-5 ">
                {/* div-1 */}
                <div className="flex items-center gap-4">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="5.88267"
                      cy="5.97447"
                      r="5.88267"
                      fill="#03781D"
                    />
                  </svg>
                  <div className="font=inter text-base font-medium text-active xl:text-[20px] xl:leading-[30px]">
                    Meeting with {meetingInfo.patient.firstName}
                  </div>
                </div>
                {/* div-2 */}
                <div className="flex items-center gap-2 ">
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.2574 9.97637C17.2574 14.306 13.7435 17.8199 9.41387 17.8199C5.08423 17.8199 1.57031 14.306 1.57031 9.97637C1.57031 5.64673 5.08423 2.13281 9.41387 2.13281C13.7435 2.13281 17.2574 5.64673 17.2574 9.97637Z"
                      stroke="#7E7E7E"
                      stroke-width="1.7648"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.3174 12.4672L9.88586 11.0161C9.4623 10.7651 9.11719 10.1612 9.11719 9.66703V6.45117"
                      stroke="#7E7E7E"
                      stroke-width="1.7648"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div className="font-inter text-sm font-medium text-[#7E7E7E] xl:text-base">
                    {format(meetingInfo.startingTime, "h':'mm a")} -{" "}
                    {format(meetingInfo.endingTime, "h':'mm a")}
                  </div>
                </div>
                {meetingInfo.status === BookAppointmentStatus.COMPLETED ? (
                  ""
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {isAfter(currentTime, meetingInfo.endingTime) && (
                      <div>
                        <Controller
                          control={control}
                          name="completed"
                          render={({ field }) => {
                            return (
                              <>
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <div>Is the Meeting Over ?</div>
                                  <Button type="submit">Submit</Button>
                                </div>
                              </>
                            );
                          }}
                        />
                      </div>
                    )}
                  </form>
                )}

                {/* div-3 */}
                <div className="font-inter text-sm font-medium">
                  Appointment booked for{" "}
                  {
                    meetingInfo.professionalUser.displayQualification
                      ?.specialization
                  }
                </div>

                {/* Reschedule-appointment */}
                {differenceInMinutes(meetingInfo.startingTime, currentTime) >
                  0 && (
                  <div className="flex items-center justify-between border-b border-primary py-5">
                    <div className="font-inter text-base font-medium">
                      <span className="font-semibold text-active">
                        Need to Reschedule?{" "}
                      </span>
                      Click cancel appointment to choose a new time
                    </div>
                    <Button
                      onClick={() => handleCancelAppointment(meetingInfo.id)}
                      className="border border-[#CA0000] bg-white px-4 py-2 text-[#CA0000] hover:bg-white"
                    >
                      Cancel Appointment
                    </Button>
                  </div>
                )}

                {/* Other-participants */}
                {data?.meetingDetails?.patient.additionalPatients.length! >
                  0 && (
                  <div className="flex flex-col gap-[10px] border-b border-primary py-5">
                    <div className="font-inter text-base font-semibold">
                      Other Participants (
                      {data?.meetingDetails?.patient.additionalPatients.length})
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        {data?.meetingDetails?.patient.additionalPatients.map(
                          (item) => (
                            <div className="flex justify-between">
                              <div className="font-inter text-sm font-normal text-[#434343]">
                                {item.firstName}
                              </div>
                              <div className="rounded-md bg-[#CCE9DC] px-2 py-1 font-inter text-xs font-medium text-secondary">
                                Accepted
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="h-[300px] overflow-y-auto">
                  {/* patient-history */}
                  <div>
                    <div className="flex flex-col gap-[10px] border-b border-primary py-5">
                      <div className="flex items-center justify-between">
                        <div className="font-inter text-base font-semibold">
                          Patient History
                        </div>
                        <Button
                          onClick={() => setIsOpen(!isOpen)}
                          className="bg-white font-inter text-xs font-medium text-primary hover:bg-white"
                        >
                          {isOpen ? " View Less" : "View More"}
                        </Button>
                      </div>

                      {/* 1st meeting */}
                      {data?.patientHistory?.length! > 0 ? (
                        <div className="flex flex-col gap-[10px]">
                          {data?.patientHistory.map((item, index) => (
                            <div className="flex justify-between rounded-[8px] border xs:p-2 sm:p-4">
                              <div className="flex flex-col gap-2 w-full">
                                <div className="flex justify-between items-center w-full ">
                                <div className="font-inter text-base font-semibold">
                                  Meeting with {item.patient.firstName}{" "}
                                  {item.patient.additionalPatients.length > 0 &&
                                    "(Couple)"}
                                </div>
                               {
                                item.status === BookAppointmentStatus.COMPLETED &&  <div className="self-start rounded-lg bg-[#E6F4F4] px-2 py-1 font-inter text-xs font-medium text-primary">
                                Completed
                              </div>
                               }
                               {
                                (item.status === BookAppointmentStatus.CANCELLED || item.status === BookAppointmentStatus.CANCELLED_WITH_REFUND )&&  <div className="self-start rounded-lg bg-[#FAE6E6] px-2 py-1 font-inter text-xs font-medium text-[#CA0000]">
                                Cancelled
                              </div>
                               }
                                </div>
                                <div className="flex items-center font-inter xs:text-xs sm:text-sm font-medium text-[#777777]">
                                  <svg
                                    className="mr-[2px] inline"
                                    width="19"
                                    height="20"
                                    viewBox="0 0 19 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M17.2574 9.97637C17.2574 14.306 13.7435 17.8199 9.41387 17.8199C5.08423 17.8199 1.57031 14.306 1.57031 9.97637C1.57031 5.64673 5.08423 2.13281 9.41387 2.13281C13.7435 2.13281 17.2574 5.64673 17.2574 9.97637Z"
                                      stroke="#7E7E7E"
                                      stroke-width="1.7648"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M12.3174 12.4672L9.88586 11.0161C9.4623 10.7651 9.11719 10.1612 9.11719 9.66703V6.45117"
                                      stroke="#7E7E7E"
                                      stroke-width="1.7648"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  <div>
                                    {format(item.startingTime, "hh:mm aaa")} -
                                    {format(item.endingTime, "hh:mm aaa")} ,
                                    {format(item.createdAt, "MMMM dd, yyyy")}
                                  </div>
                                </div>
                                <div className="font-inter text-xs font-medium text-inactive">
                                  Appointment booked for{" "}
                                  {
                                    item.professionalUser.displayQualification
                                      ?.specialization
                                  }
                                  
                                </div>
                                {item.patient.additionalPatients.length > 0 && (
                                  <div className="my-4 font-inter text-xs font-normal text-inactive">
                                    <span className="text-sm font-semibold text-primary">
                                      Participants:
                                    </span>{" "}
                                    <div className="flex">
                                      {" "}
                                      {item.patient.additionalPatients.map(
                                        (additionalPatient) =>
                                          additionalPatient.firstName,
                                      )}
                                    </div>
                                  </div>
                                )}
                                {item.comments[item.comments.length - 1]
                                  ?.comment && (
                                  <div className="font-inter text-xs font-normal text-inactive">
                                    <span className="text-sm font-semibold text-primary">
                                      Doctor's Comment:
                                    </span>{" "}
                                    {
                                      item.comments[item.comments.length - 1]
                                        ?.comment
                                    }
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>There is no history</div>
                      )}
                    </div>
                   
                  </div>

                  {/* doctor's-comment */}
                  <div className="flex flex-col gap-[18px] pb-[50px] pt-5">
                    {/* heading */}
                    <div className="font-inter text-base font-semibold">
                      Doctor's Comment
                    </div>
                   
                    <DoctorCommentForm bookAppointmentId={meetingInfo.id} />
                    {/* comments-from-doctor-with-time */}
                    <div className="flex flex-col gap-3">
                      {/* 1st-comment */}
                      {data?.comments.map((item) => (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-[2px] font-inter text-sm font-medium text-active">
                            <svg
                              width="19"
                              height="20"
                              viewBox="0 0 19 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.2574 9.97637C17.2574 14.306 13.7435 17.8199 9.41387 17.8199C5.08423 17.8199 1.57031 14.306 1.57031 9.97637C1.57031 5.64673 5.08423 2.13281 9.41387 2.13281C13.7435 2.13281 17.2574 5.64673 17.2574 9.97637Z"
                                stroke="#7E7E7E"
                                stroke-width="1.7648"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12.3174 12.4672L9.88586 11.0161C9.4623 10.7651 9.11719 10.1612 9.11719 9.66703V6.45117"
                                stroke="#7E7E7E"
                                stroke-width="1.7648"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            {format(item.createdAt, "hh:mm aaa, MMMM dd, yyyy")}
                            {/* 9:00am, March 20, 2024 */}
                          </div>
                          <div className="font-inter text-xs font-normal text-inactive">
                           
                            {item.comment}
                          </div>
                        </div>
                      ))}
                     
                    </div>
                  </div>
                </div>
              </div>

              {/* Google-Meet-Link */}
              {BookAppointmentStatus.COMPLETED !== meetingInfo.status &&
                meetingInfo.meeting?.hangoutLink && 
                  <div className="border-t">
                    <div className="px-10 py-5">
                      <Link
                        href={meetingInfo.meeting?.hangoutLink || ""}
                        target="_blank"
                      >
                        <Button className="w-full rounded-[12px] border border-primary bg-white  py-3 font-inter text-base font-medium text-inactive hover:bg-white">
                          <div className="w-10">
                            <div className="relative aspect-square w-full">
                              <Image
                                src="/images/google-meet.png"
                                alt="meeting-link"
                                fill={true}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          Go to meet link
                        </Button>
                      </Link>
                    </div>
                  </div>
                }
            </div>{" "}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default MeetingCard;
