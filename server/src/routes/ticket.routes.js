import express from "express";
import { createTicket, getAllTickets, updateTicketStatus } from "../controllers/ticketController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Customer routes
router.post("/create", authenticate, authorize("customer"), createTicket);

// Common routes for agents and admins to view tickets
router.get("/", authenticate, authorize("agent", "admin"), getAllTickets);
router.put("/:ticketId/status", authenticate, authorize("agent", "admin"), updateTicketStatus);

export default router;
