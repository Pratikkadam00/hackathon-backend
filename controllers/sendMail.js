import sendEmail from "../utils/emailService";

export const sendReminder = async (req, res) => {
  try {
    const { email, eventName, date } = req.body;

    const subject = `Reminder: Upcoming Event - ${eventName}`;
    const text = `Hello! Just a reminder that the event '${eventName}' is scheduled for ${date}.`;
    const html = `<p>Hello! Just a reminder that the event <b>${eventName}</b> is scheduled for <b>${date}</b>.</p>`;

    await sendEmail(email, subject, text, html);

    res.status(200).json({ message: "Reminder email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email reminder.", error });
  }
};
