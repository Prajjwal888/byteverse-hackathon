import Donor from "../models/donorModel.js";
import Receiver from "../models/receiverModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const registerUser = async (req, res) => {
  const { name, phoneNumber, email, password, role, location } = req.body;
  try {
    const existingUser =
      role === "donor"
        ? await Donor.findOne({ email })
        : await Receiver.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;
    let lat,lon;
    if (role === "donor") {
      newUser = await Donor.create({
        name,
        phoneNumber,
        email,
        password: hashedPassword,
      });
    } else {
      if (!location) {
        return res
          .status(400)
          .json({ message: "Address is required for receivers" });
      }
      if (!lat || !lon) {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location.address)}`
        );
        const geoData = await geoRes.json();
        if (geoData.length > 0) {
          lat = geoData[0].lat;
          lon = geoData[0].lon;
        } else {
          throw new Error("Could not geocode address to lat/lon");
        }
      }
      newUser = await Receiver.create({
        name,
        phoneNumber,
        email,
        password: hashedPassword,
        location: {
          address: location,
          lattitude: lat || "",
          longitude: lon || "",
        },
      });
    }

    const token = jwt.sign({ id: newUser._id, role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user =
      role === "donor"
        ? await Donor.findOne({ email })
        : await Receiver.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
