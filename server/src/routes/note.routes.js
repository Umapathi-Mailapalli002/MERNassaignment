import express from "express";
import { addNote, getNotesForTicket } from "../controllers/noteController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes for adding and viewing notes on a ticket
router.post("/:ticketId", authenticate, authorize("customer", "agent", "admin"), addNote);
router.get("/:ticketId", authenticate, authorize("customer", "agent", "admin"), getNotesForTicket);

export default router;
