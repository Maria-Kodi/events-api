import { Op } from "sequelize";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { Event } from "../db.js";

// 📦 GET all events
export const getAllEvents = asyncWrapper(async (req, res) => {
  const events = await Event.findAll({
    order: [["date", "DESC"]],
  });

  res.json(events);
});

// 📅 GET event by ID
export const getEventById = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByPk(id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json(event);
});

// ➕ CREATE event
export const createEvent = asyncWrapper(async (req, res) => {
  const { title, date, description } = req.body;

  const event = await Event.create({
    title,
    date,
    description,
  });

  res.status(201).json(event);
});

// ✏️ UPDATE event
export const updateEvent = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByPk(id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  await event.update(req.body);

  res.json(event);
});

// 🗑️ DELETE event
export const deleteEvent = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByPk(id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  await event.destroy();

  res.json({ message: "Event deleted successfully" });
});

// ⭐ UPCOMING events
export const findUpcomingEvents = asyncWrapper(async (req, res) => {
  const upcomingEvents = await Event.findAll({
    where: {
      date: {
        [Op.gt]: new Date(),
      },
    },
    order: [["date", "ASC"]],
  });

  res.json(upcomingEvents);
});