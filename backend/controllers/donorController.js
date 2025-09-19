import Donor from "../models/donorModel.js";
import Request from "../models/requestModel.js";
import bcrypt from "bcryptjs";
import axios from "axios";
import Receiver from "../models/receiverModel.js";
import dotenv from "dotenv";
dotenv.config();

export const editDonorProfile = async (req, res) => {
  try {
    const { id } = req.user; // Only need ID
    const donor = await Donor.findById(id);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Update only fields present in the body
    if (req.body.name) donor.name = req.body.name;
    if (req.body.phoneNumber) donor.phoneNumber = req.body.phoneNumber;
    //   if (req.body.email) donor.email = req.body.email;

    // If password is provided, hash and update it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      donor.password = await bcrypt.hash(req.body.password, salt);
    }

    // Save updated donor
    const updatedDonor = await donor.save();

    res.status(200).json({
      message: "Donor profile updated successfully",
      donor: updatedDonor,
    });
  } catch (error) {
    console.error("Error updating donor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const donorRequest = async (req, res) => {
  try {
    const {
      foodType,
      approxPeople,
      location,
      expiryTime,
      imageUrl,
      latitude,
      longitude,
    } = req.body;

    let lat = latitude;
    let lon = longitude;

    if (!lat || !lon) {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location.address
        )}`
      );
      const geoData = await geoRes.json();
      if (geoData.length > 0) {
        lat = geoData[0].lat;
        lon = geoData[0].lon;
      } else {
        throw new Error("Could not geocode address to lat/lon");
      }
    }
    // console.log(lat)
    // console.log(lon)

    const mlResponse = await axios.post(
      "http://127.0.0.1:10000/predict-urgency",
      {
        food_type: foodType,
        quantity: approxPeople,
        expiry_time: expiryTime,
        location: {
          lat,
          lon,
        },
      }
    );

    const { urgency_score, matched_ngos } = mlResponse.data;

    const newRequest = new Request({
      donor: req.user.id,
      foodType,
      approxPeople,
      location: {
        address: location,
        latitude: lat,
        longitude: lon,
      },
      expiryTime,
      imageUrl,
      status: "pending",
    });

    await newRequest.save();

    const top3 = matched_ngos.slice(0, 3);

    for (const ngo of top3) {
      const dbNgo = await Receiver.findOne({ name: ngo.name });
      if (dbNgo) {
        if (!dbNgo.requests) dbNgo.requests = [];
        dbNgo.requests.push(newRequest._id);
        await dbNgo.save();
        console.log(`Request assigned to: ${dbNgo.name}`);
      }
    }

    res.status(201).json({
      message: "Request created successfully",
      request: newRequest,
      urgency_score,
      matched_ngos: top3,
    });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Server error", error: error });
  }
}; 
export const getDonorRequests = async (req, res) => {
  const { id } = req.user;
  try {
    const requests = await Request.find({ donor: id }).populate(
      "donor",
      "name phoneNumber email"
    );
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getDonorProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const donor = await Donor.findById(id).select("-password");

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json({ donor });
  } catch (error) {
    console.error("Error fetching donor profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
