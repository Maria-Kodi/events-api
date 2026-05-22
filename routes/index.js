import express from "express";
import eventsRouter from "./events.js";
import usersRouter from "./users.js";
import authRouter from "./auth.js";

const router = express.Router();

/**
 * 🔐 AUTH ROUTES
 */
router.use("/auth", authRouter);

/**
 * 👤 USERS ROUTES
 */
router.use("/users", usersRouter);

/**
 * 📅 EVENTS ROUTES
 */
router.use("/events", eventsRouter);

/**
 * ❗ 404 fallback (optional but good practice)
 */
router.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

export default router;