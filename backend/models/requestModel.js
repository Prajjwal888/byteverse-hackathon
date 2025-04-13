import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },
  foodType: {
    type: String,
    enum: ["Cooked", "Dry", "Fresh"],
    required: true,
  },
  approxPeople: {
    type: Number,
    required: true,
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    latitude: String,
    longitude: String,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "collected", "expired"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reciever",
    default: null,
  },
});

const Request = mongoose.model("Request", requestSchema);
export default Request;
