import express from "express";
import { addNote, getNotesForTicket } from "../controllers/note.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Routes for adding and viewing notes on a ticket
router.post("/:ticketId", verifyJWT,addNote);
router.get("/:ticketId", verifyJWT,  getNotesForTicket);

export default router;
