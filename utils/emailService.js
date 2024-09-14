import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});


const sendEmail = async (to, subject, text, html, calendarInvite) => {
  try {
    
    const mailOptions = {
      from: `"Event Management" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      text,
      html,
      attachments: [],
    };

    
    if (calendarInvite) {
      mailOptions.attachments.push({
        filename: 'calendar.ics',
        content: calendarInvite.toString(),
        contentType: 'text/calendar; charset=utf-8; method=REQUEST',
        contentDisposition: 'attachment',
      });
    }

 
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

export default sendEmail;
