import { Note } from "../models/note.model.js";
import { Ticket } from "../models/ticket.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addNote = asyncHandler(async (req, res) => {
    const { ticketId } = req.params;
    const { content, attachment } = req.body;
    const addedBy = req.user._id;

    if (!content) {
        throw new ApiError(400, "Note content is required");
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    const note = await Note.create({ ticket: ticketId, content, attachment, addedBy });
    ticket.lastUpdatedOn = Date.now();
    await ticket.save();

    if (!note) {
        throw new ApiError(500, "Error while creating note");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, note, "Note added successfully"));
});

const getNotesForTicket = asyncHandler(async (req, res) => {
    const { ticketId } = req.params;
    const notes = await Note.find({ ticket: ticketId }).populate("addedBy", "username");

    if (!notes.length) {
        throw new ApiError(404, "No notes found for this ticket");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, notes, "Notes retrieved successfully"));
});

export {
    addNote,
    getNotesForTicket
};
