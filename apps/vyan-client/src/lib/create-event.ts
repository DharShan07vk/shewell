// import { NextApiRequest, NextApiResponse } from "next";
// import { getGoogleCalendarClient } from "../lib/google-calendar";
// import { getSession } from "next-auth/react";
// import { db } from "~/server/db";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const session = await getSession({ req });
//   if (!session) {
//     return res.status(401).json({ message: "Not authenticated" });
//   }

//   const professionalUser = await db.professionalUser.findFirst({
//     where: {
//       email: session.user.email,
//     },
//   });
//   const access_token = await db.professionalUser.findFirst({
//     select: {
//       googleAccessToken: true,
//     },
//     where: {
//       id: professionalUser?.id,
//     },
//   });

//   const calendar = getGoogleCalendarClient(access_token?.googleAccessToken!);

//   const event = {
//     summary: "Google Meet Meeting",
//     description: "A sample meeting with a Google Meet link",
//     start: {
//       dateTime: "2024-10-07T10:00:00-07:00",
//       timeZone: "America/Los_Angeles",
//     },
//     end: {
//       dateTime: "2024-10-07T11:00:00-07:00",
//       timeZone: "America/Los_Angeles",
//     },
//     conferenceData: {
//       createRequest: {
//         requestId: "randomString",
//         conferenceSolutionKey: { type: "hangoutsMeet" },
//       },
//     },
//   };

//   try {
//     const response = await calendar.events.insert({
//       calendarId: "primary",
//       conferenceDataVersion: 1,

//       //   calendarId: "primary",
//       //   resource: event,
//       //   conferenceDataVersion: 1, // Necessary to create Google Meet links
//     });
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating event", error });
//   }
// }

"use server";
import { NextRequest, NextResponse } from "next/server";
import { getGoogleCalendarClient } from "../lib/google-calendar";
import { getSession } from "next-auth/react";
import { db } from "~/server/db";
import { getServerSession } from "next-auth";
import { formatISO } from "date-fns";

import axios from "axios";
import { env } from "~/env";

const tokenUrl = "https://oauth2.googleapis.com/token";
const calendarUrl =
  "https://www.googleapis.com/calendar/v3/calendars/primary/events";

const session = await getServerSession();
if(!session){
  throw new Error("Session not found")
}
if(!session.user.email){
  throw new Error("Unauthorised")
}
const refreshToken = await db.professionalUser.findFirst({
  select: {
    googleRefreshToken: true,
  },
  where: {
    email: session.user.email,
  },
});

export async function getAccessToken() {
  try {
    const response = await axios.post(tokenUrl, null, {
      params: {
        grant_type: "refresh_token",
        client_secret: env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        client_id: env.GOOGLE_CLIENT_ID,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}

export async function createEvent({
  professionalUserId,
  startTime,
  endTime,
}: {
  professionalUserId: string;
  appointmentId: string;
  startTime: Date;
  endTime: Date;
}) {
  // const accessTokenRecord = await db.professionalUser.findFirst({
  //   select: {
  //     googleAccessToken: true,
  //   },
  //   where: {
  //     id: professionalUserId,
  //   },
  // });

  // const access_token = accessTokenRecord?.googleAccessToken;
  // console.log("access_token", access_token, professionalUserId);
  const access_token = await getAccessToken();
  const calendarUrl =
    "https://www.googleapis.com/calendar/v3/calendars/primary/events";
  const calendar = getGoogleCalendarClient(access_token!);

  const event = {
    summary: "Google Meet Meeting",
    description: "A sample meeting with a Google Meet link",
    start: {
      dateTime: formatISO(startTime),
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: formatISO(endTime),
      timeZone: "America/Los_Angeles",
    },
    conferenceData: {
      createRequest: {
        requestId: "randomString",
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  try {
    // const response =  await calendar.events.insert({
    //   calendarId: "primary",

    //     resource: event,
    //   conferenceDataVersion: 1, // Necessary to create Google Meet links
    // });

    // console.log("create-google-event")
    // return {
    //   message : "Event has been generated"
    // }

    const response = await axios.post(calendarUrl, event, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      params: {
        conferenceDataVersion: 1,
      },
    });
    console.log(" responseDataCreateEvent", response.data);

    return response.data;
  } catch (error) {
    console.log("create-event-error", error);
    throw new Error("Event cannot be generated");
  }
}
export async function updateEvent({
  professionalUserId,
  startTime,
  endTime,
  eventId,
}: {
  professionalUserId: string;
  appointmentId: string;
  startTime: Date;
  endTime: Date;
  eventId: string;
}) {
  const accessTokenRecord = await db.professionalUser.findFirst({
    select: {
      googleAccessToken: true,
    },
    where: {
      id: professionalUserId,
    },
  });

  const access_token = accessTokenRecord?.googleAccessToken;
  console.log("access_token", access_token, professionalUserId, eventId);
  const calendarUrl =
    "https://www.googleapis.com/calendar/v3/calendars/primary/events";
  const calendar = getGoogleCalendarClient(access_token!);

  const event = {
    summary: "Google Meet Meeting",
    description: "A sample meeting with a Google Meet link",
    start: {
      dateTime: formatISO(startTime),
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: formatISO(endTime),
      timeZone: "America/Los_Angeles",
    },
    conferenceData: {
      createRequest: {
        requestId: "randomString",
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  try {
    // const response =  await calendar.events.insert({
    //   calendarId: "primary",

    //     resource: event,
    //   conferenceDataVersion: 1, // Necessary to create Google Meet links
    // });

    // console.log("create-google-event")
    // return {
    //   message : "Event has been generated"
    // }

    const response = await axios.patch(`${calendarUrl}/${eventId}`, event, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      params: {
        conferenceDataVersion: 1,
      },
    });

    console.log(" responseDataUpdateEvent", response.data);

    return response.data;
  } catch (error) {
    console.log("update-event-error", error);
    throw new Error("Event cannot be generated");
  }
}

export async function deleteEvent({
  professionalUserId,
  eventId,
}: {
  professionalUserId: string;
  eventId: string;
}) {
  const accessTokenRecord = await db.professionalUser.findFirst({
    select: {
      googleAccessToken: true,
    },
    where: {
      id: professionalUserId,
    },
  });
  const access_token = accessTokenRecord?.googleAccessToken;
  if (!access_token) {
    throw new Error("Access token not found");
  }

  console.log(
    "access_token",
    access_token,
    professionalUserId,
    "eventId",
    eventId,
  );

  const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`;
  try {
    // Make a DELETE request to Google Calendar API to delete the event
    const response = await axios.delete(calendarUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Event deleted successfully", response.data);

    return {
      message: "Event deleted successfully",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("delete-event-error-1", error.status);
      console.error(
        "delete-event-error-2",
        JSON.stringify(error.response?.data.error),
      );
    } else {
      console.error("general-error", error);
    }
    console.log("delete-event-error", error);
    throw new Error("Event could not be deleted");
  }
}
