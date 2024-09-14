import Event from "../models/Event.js";

// Create Event
const createEvent = async (req, res) => {
  const { title, description, date } = req.body;

  const event = await Event.create({
    title,
    description,
    date,
    createdBy: req.user._id,
  });

  res.status(201).json(event);
};

// Get All Events
const getEvents = async (req, res) => {
  const events = await Event.find().populate("createdBy", "name");
  res.json(events);
};

export { createEvent, getEvents };
