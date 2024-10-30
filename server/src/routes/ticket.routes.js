import express from "express";
import { createTicket, getAllTickets, updateTicketStatus } from "../controllers/ticket.controller.js";
import { verifyJWT,authorizedRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Customer routes
router.route("/create-ticket").post( verifyJWT, createTicket);

// Common routes for agents and admins to view tickets
router.route("/all-tickets").get( verifyJWT,authorizedRole(["CustomerServiceAgent","Admin"]), getAllTickets);
router.route("/:ticketId/status").patch(verifyJWT, authorizedRole(["CustomerServiceAgent","Admin"]), updateTicketStatus);

export default router;
