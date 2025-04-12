import Donor from "../models/donorModel.js";
import Request from "../models/requestModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
        const { foodType, approxPeople, location, expiryTime, imageUrl } = req.body;
        const newRequest = new Request({
          donor: req.user.id,
          foodType,
          approxPeople,
          location,
          expiryTime,
          imageUrl,
        });
  
        await newRequest.save();
        res.status(201).json({ message: "Request created successfully", request: newRequest });
      }
       catch (error) {
        console.error("Error creating request:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
  }

    export const getDonorRequests = async (req, res) => {
    const { donorId } = req.params;
    try {
        const requests = await Request.find({ donor: donorId }).populate('donor', 'name phoneNumber email');
        res.status(200).json(requests);
      } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    
    }


  