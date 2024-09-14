import nodemailer from "nodemailer";
import dotenv from "dotenv"


dotenv.config();


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send email
const sendEmail = async (to, subject, text, html, calendarInvite) => {
  try {
    const mailOptions = {
      from: `"Event Management" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      text,
      html,
      attachments: [
        {
          filename: 'invite.ics',
          content: calendarInvite.toString(),
          contentType: 'text/calendar; charset=UTF-8; method=REQUEST',
        },
      ],
      alternatives: {
        "Content-Type": "text/calendar",
        method: "REQUEST",
        content: Buffer.from(calendarInvite.toString()),
        component: "VEVENT",
        "Content-Class": "urn:content-classes:calendarmessage",
      },
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

export default sendEmail