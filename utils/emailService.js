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
 const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: `"Event Management" <${process.env.EMAIL_USERNAME}>`,
      to, 
      subject, 
      text, 
      html, 
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