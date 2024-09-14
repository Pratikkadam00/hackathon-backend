import express from "express";
import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} from "../controllers/eventController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", protect, getEvents);
router.get("/:id", protect, getEventById);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);


export default router;
