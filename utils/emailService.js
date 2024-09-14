// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();


// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });


// const sendEmail = async (to, subject, text, html, calendarInvite) => {
//   try {
    
//     const mailOptions = {
//       from: `"Event Management" <${process.env.EMAIL_USERNAME}>`,
//       to,
//       subject,
//       text,
//       html,
//       attachments: [
//         {
//           filename: "invitation.ics",
//           content: cal.toString(),
//           contentType: "text/calendar; charset=utf-8",
//         },
//       ],
//     };

 
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: %s", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Could not send email");
//   }
// };

// export default sendEmail;
import nodemailer from "nodemailer";
import ical from "ical-generator";
import dotenv from "dotenv";

dotenv.config();

// Function to create the event invite
const createEventInvite = (date, title) => {
  const eventObj = {
    start: new Date(date),
    end: new Date(new Date(date).getTime() + 60 * 60 * 1000), // 1 hour event
    summary: title,
    method: "REQUEST",
    description: `This is an invitation for the event: ${title}.`,
    location: "Online",
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

  // Create the calendar object and add the event
  const cal = ical();
  cal.createEvent(eventObj);
  cal.method("REQUEST");

  return cal; // Return the calendar object
};

// Function to send an email with the calendar invite
const sendEmail = async (to, subject, text, html, calendarInvite) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const mailOptions = {
      from: `"Event Management" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      text,
      html,
      attachments: [
        {
          filename: "invitation.ics",
          content: calendarInvite.toString(),
          contentType: "text/calendar; charset=utf-8",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

// Export functions for use in other modules
export { createEventInvite, sendEmail };
