import mongoose, { Schema } from "mongoose";

const receiverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    address: { type: String, required: true },
    lattitude: { type: String },
    longitude: { type: String },
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

const Receiver = mongoose.model("Receiver", receiverSchema);
export default Receiver;
