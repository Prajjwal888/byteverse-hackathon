import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receiver",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;
