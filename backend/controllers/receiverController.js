import Receiver from "../models/recieverModel.js";
import Request from "../models/requestModel.js";
import Achievement from "../models/achievementModel.js"; // You’ll need this model
import Pickup from "../models/pickupModel.js"; // You’ll need this model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Edit profile
export const editReceiverProfile = async (req, res) => {
  try {
    const { id } = req.body;
    const receiver = await Receiver.findById(id);

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (req.body.name) receiver.name = req.body.name;
    if (req.body.phoneNumber) receiver.phoneNumber = req.body.phoneNumber;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      receiver.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedReceiver = await receiver.save();

    res.status(200).json({
      message: "Receiver profile updated successfully",
      receiver: updatedReceiver,
    });
  } catch (error) {
    console.error("Error updating receiver:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all donation requests for receiver to view
export const getAvailableRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: "pending" }).populate("donor", "name");
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching available requests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Accept a request
export const acceptRequest = async (req, res) => {
  const { requestId, receiverId } = req.body;

  try {
    const request = await Request.findById(requestId);
    if (!request || request.status !== "pending") {
      return res.status(400).json({ message: "Request not available" });
    }

    request.status = "accepted";
    request.receiver = receiverId;
    await request.save();

    // Log pickup (optional)
    const newPickup = new Pickup({
      receiver: receiverId,
      donor: request.donor,
      request: requestId,
      foodType: request.foodType,
      quantity: request.approxPeople,
      status: "completed",
      date: new Date(),
    });

    await newPickup.save();

    res.status(200).json({ message: "Request accepted", request });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get pickup history for a receiver
export const getPickupHistory = async (req, res) => {
  const { receiverId } = req.params;

  try {
    const pickups = await Pickup.find({ receiver: receiverId }).populate("donor", "name");
    res.status(200).json(pickups);
  } catch (error) {
    console.error("Error fetching pickup history:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add achievement
export const addAchievement = async (req, res) => {
  try {
    const { receiverId, title, description } = req.body;

    const newAchievement = new Achievement({
      receiver: receiverId,
      title,
      description,
      date: new Date(),
    });

    await newAchievement.save();
    res.status(201).json({ message: "Achievement added", achievement: newAchievement });
  } catch (error) {
    console.error("Error adding achievement:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all achievements
export const getAchievements = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const achievements = await Achievement.find({ receiver: receiverId }).sort({ date: -1 });
    res.status(200).json(achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
