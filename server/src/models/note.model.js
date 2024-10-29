import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Note content is required"],
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attachment: {
      type: String, // URL for any attached files
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
