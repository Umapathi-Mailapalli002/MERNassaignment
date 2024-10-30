import express from "express";
import { addNote, getNotesForTicket } from "../controllers/note.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Routes for adding and viewing notes on a ticket
router.route("/:ticketId").post( verifyJWT,addNote);
router.route("/:ticketId").get( verifyJWT,  getNotesForTicket);

export default router;
