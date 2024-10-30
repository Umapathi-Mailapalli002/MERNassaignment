import express from "express";
import { createTicket, getAllTickets, updateTicketStatus } from "../controllers/ticket.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Customer routes
router.post("/create", verifyJWT, createTicket);

// Common routes for agents and admins to view tickets
router.get("/", verifyJWT,  getAllTickets);
router.put("/:ticketId/status", verifyJWT, updateTicketStatus);

export default router;
