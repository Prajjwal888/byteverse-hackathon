import mongoose, { Schema } from "mongoose";
const recieverSchema = new mongoose.Schema({
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
    address:{ type: String, required: true },
    lattitude: { type: String},
    longitude: { type: String},
  },
});

const Reciever = mongoose.model("Reciever", recieverSchema);
export default Reciever;
