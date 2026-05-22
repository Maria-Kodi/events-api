import express from "express";
import {
  findUpcomingEvents,
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.js";

const router = express.Router();

// ⭐ specific routes FIRST
router.get("/upcoming", findUpcomingEvents);

// 📦 GET all events
router.get("/", getAllEvents);

// 📅 GET single event
router.get("/:id", getEventById);

// ➕ CREATE event
router.post("/", createEvent);

// ✏️ UPDATE event
router.put("/:id", updateEvent);

// 🗑️ DELETE event
router.delete("/:id", deleteEvent);

export default router;