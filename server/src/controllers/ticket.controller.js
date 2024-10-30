import { Ticket } from "../models/ticket.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const createTicket = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const user = req.user._id;

    if (!title && !description) {
        throw new ApiError(400, "Ticket title and description is required");
    }

    const ticket = await Ticket.create({ title,description, user });
    if (!ticket) {
        throw new ApiError(500, "Error while creating ticket");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, ticket, "Ticket created successfully"));
});

const getAllTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find().populate("user", "username");
    if (!tickets.length) {
        throw new ApiError(404, "No tickets found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, tickets, "Tickets retrieved successfully"));
});

const updateTicketStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { ticketId } = req.params;

    if (!status) {
        throw new ApiError(400, "Ticket status is required");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, { status }, { new: true });
    if (!updatedTicket) {
        throw new ApiError(500, "Error while updating ticket status");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTicket, "Ticket status updated successfully"));
});

export {
    createTicket,
    getAllTickets,
    updateTicketStatus
};
