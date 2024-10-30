import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Closed"],
      default: "Active",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastUpdatedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre-save hook to update 'lastUpdatedOn' before saving a note to a ticket
ticketSchema.pre("save", function (next) {
  this.lastUpdatedOn = Date.now();
  next();
});

export const Ticket = mongoose.model("Ticket", ticketSchema);
