import ical from "ical-generator";

export const createEventInvite = (date, title) => {
  // const cal = ical({ name: `Invitation: ${title}` });

  // cal.createEvent({
  //     start: new Date(date),
  //     end: new Date(), // 1 hour event
  //     summary: title,
  //     description: `This is an invitation for the event: ${title}.`,
  //     location: 'Online',
  // });

  // return cal.toString();

  const eventObj = {
    start: new Date(date),
    end: new Date(),
    summary: title,
    method: "request",
    description: `This is an invitation for the event: ${title}.`,
    location: "Online",
    organizer: {
      name: "Jay Lakhdive",
      email: "jayl@valueaddsofttech.com",
    },
    attendees: [
      {
        name: "Sidhesh Parab",
        email: "sidheshp@valueaddsofttech.com",
        status: "NEEDS-ACTION",
        rsvp: true, // Set rsvp to true to request RSVP
        partstat: "PENDING", // Set partstat to PENDING for RSVP
        role: "REQ-PARTICIPANT", // Set role to REQ-PARTICIPANT for RSVP
      },
    ],
    questions: [
      {
        question: "Will you be attending the meeting?",
        answers: [
          {
            answer: "Yes",
            value: "YES",
          },
          {
            answer: "No",
            value: "NO",
          },
        ],
      },
    ],
  };

  const cal = ical();
  cal.createEvent(eventObj);
  cal.method("REQUEST");
};
