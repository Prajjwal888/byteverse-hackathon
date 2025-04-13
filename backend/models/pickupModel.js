import mongoose from "mongoose";

const pickupSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Receiver",
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    foodType: String,
    quantity: Number,
    status: {
      type: String,
      enum: ["completed", "cancelled"],
      default: "completed",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Pickup = mongoose.model("Pickup", pickupSchema);
export default Pickup;
