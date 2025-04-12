import Donor from "../models/donorModel.js";
import Reciever from "../models/recieverModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const registerUser = async (req, res) => {
  const { name, phoneNumber, email, password, role, location } = req.body;
  try {
    const existingUser = (role === "donor" ? await Donor.findOne({ email }) : await Reciever.findOne({ email }));
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (role === "donor") {
      newUser = await Donor.create({ name, phoneNumber, email, password: hashedPassword });
    } else {
      newUser = await Reciever.create({ name, phoneNumber, email, password: hashedPassword, location });
    }

    const token = jwt.sign({ id: newUser._id, role }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = role === "donor" ? await Donor.findOne({ email }) : await Reciever.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};