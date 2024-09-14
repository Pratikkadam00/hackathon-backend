import nodemailer from "nodemailer";
import "dotenv/config";
import ical from "ical-generator";

const eventObj = {
  start: new Date("2023-11-28T10:00:00"),
  end: new Date("2023-11-28T11:00:00"),
  summary: "Meeting with John Doe",
  method: "request",
  description:
    "Please join us for a meeting with John Doe to discuss the upcoming project.",
  location: "Conference Room 1",
  organizer: {
    name: "Jay Lakhdive",
    email: "pratikadam00@gmail.com",
  },
  attendees: [
    {
      name: "Sidhesh Parab",
      email: "sidheshparab34@gmail.com",
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

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

console.log({
  user: process.env.EMAIL_USERNAME,
  pass: process.env.EMAIL_PASSWORD,
});

const message = {
  from: "pratikadam00@gmail.com",
  to: "pratikadam00@gmail.com",
  subject: "Meeting Invitation",
  text: "Please join us for a meeting with John Doe to discuss the upcoming project. See attached ical file for details.",
  attachments: [
    {
      filename: "invitation.ics",
      content: cal.toString(),
      contentType: "text/calendar; charset=utf-8",
    },
  ],
};

console.log(cal.toString());
function sendEmail() {
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Email sent:", info.messageId);
    }
  });
}
sendEmail();
