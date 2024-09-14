import Event from "../models/Event.js";
import sendEmail from "../utils/emailService.js";
import User from "../models/User.js";
import getEventEmailTemplate from "../Template/emailTemplate.js";
import { createEventInvite } from "../utils/icalGenerator.js";


// const createEvent = async (req, res) => {
//   try {
//     const { title, description, date, notificationsSent, attendees } = req.body;

//     console.log("Creating event with data:", { title, description, date, attendees });

//     // Create the event in the database
//     const event = await Event.create({
//       title,
//       description,
//       date,
//       notificationsSent,
//       attendees,
//       createdBy: req.user._id, // Assuming req.user is populated via auth middleware
//     });

//     console.log("Event created:", event);

//     // Send reminder emails to attendees if there are any
//     if (attendees && attendees.length > 0) {
//       // const subject = `Event Confirmation: ${title} is Scheduled!`;
//       const subject = `Event Confirmation: ${title} is Scheduled!`;

//       const text = `Dear attendee,\n\nWe are excited to inform you that the event '${title}' has been successfully scheduled for ${new Date(date).toLocaleString()}.\n\nPlease mark your calendar and stay tuned for more updates.\n\nThank you for your participation!\n\nBest regards,\n[Your Organization's Name]`;

//       const html = `
//   <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
//     <!-- Header Section -->
//     <div style="text-align: center; padding: 15px; background: linear-gradient(90deg, #007bff, #0056b3); color: white; border-radius: 8px 8px 0 0;">
//       <h1 style="margin: 0;">Event Created: ${title}</h1>
//     </div>

//     <!-- Body Section -->
//     <div style="border: 1px solid #ddd; border-radius: 0 0 8px 8px; padding: 20px; background-color: white;">
//       <p>Dear attendee,</p>
//       <p>We are excited to inform you that the event <b>${title}</b> has been successfully scheduled for:</p>
//       <p style="font-size: 16px; color: #007bff;"><b>${new Date(date).toLocaleString()}</b></p>
//       <p>Please mark your calendar and stay tuned for more updates.</p>

//       <p style="margin-top: 20px;">Thank you for your participation!</p>

//       <!-- Footer Section -->
//       <p style="color: #666;">Best regards,</p>
//       <p><b>Pratik India Pvt Ltd</b></p>
//     </div>
//   </div>
// `;
//       for (const attendeeId of attendees) {
//         try {
//           const attendee = await User.findById(attendeeId);

//           if (attendee && attendee.email) {
//             console.log(`Sending email to: ${attendee.email}`);
//             await sendEmail(attendee.email, subject, text, html);
//           } else {
//             console.warn(`Attendee with ID ${attendeeId} not found or missing email`);
//           }
//         } catch (emailError) {
//           console.error(`Failed to send email to attendee ${attendeeId}:`, emailError);
//         }
//       }
//     } else {
//       console.log("No attendees provided for event");
//     }

//     res.status(201).json(event);
//   } catch (error) {
//     console.error("Error creating event:", error);
//     res.status(500).json({ message: "Failed to create event.", error });
//   }
// };

// Get All Events
 const createEvent = async (req, res) => {
  try {
    const { title, description, date, notificationsSent, attendees } = req.body;

    // Create the event in the database
    const event = await Event.create({
      title,
      description,
      date,
      notificationsSent,
      attendees,
      createdBy: req.user._id, // Assuming req.user is populated via auth middleware
    });

    console.log("Event created:", event);

    // Immediate response to the client while sending emails in the background
    res.status(201).json({ message: 'Event created successfully, email reminders are being sent.', event });

    // Background process: Send emails and calendar invites to attendees
    setImmediate(async () => {
      if (attendees && attendees.length > 0) {
        const subject = `Event Confirmation: ${title} is Scheduled!`;

        const text = `Dear attendee,\n\nWe are excited to inform you that the event '${title}' has been successfully scheduled for ${new Date(date).toLocaleString()}.\n\nPlease mark your calendar and stay tuned for more updates.\n\nThank you for your participation!\n\nBest regards,\n[Your Organization's Name]`;

        const html = getEventEmailTemplate(title, date);

        
        // Create iCalendar invite
        const calendarInvite = createEventInvite(date, title );

        for (const attendeeId of attendees) {
          try {
            const attendee = await User.findById(attendeeId);

            if (attendee && attendee.email) {
              console.log(`Sending email to: ${attendee.email}`);
              await sendEmail(attendee.email, subject, text, html, calendarInvite);
            } else {
              console.warn(`Attendee with ID ${attendeeId} not found or missing email`);
            }
          } catch (emailError) {
            console.error(`Failed to send email to attendee ${attendeeId}:`, emailError);
          }
        }
      } else {
        console.log("No attendees provided for event");
      }
    });

  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event.", error });
  }
};



const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name");
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
};

// Get Event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name");

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Error fetching event" });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to update this event" });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: "Error updating event" });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this event" });
    }

    await event.remove();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
};

export { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
