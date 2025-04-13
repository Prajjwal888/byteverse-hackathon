import express from "express";
import {
  editDonorProfile,
  donorRequest,
  getDonorRequests,
  getDonorProfile,
} from "../controllers/donorController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const donorRouter = express.Router();

donorRouter.post("/edit-profile", verifyToken, editDonorProfile);
donorRouter.post("/donor-request", verifyToken, donorRequest);
donorRouter.get("/donor-requests", verifyToken, getDonorRequests);
donorRouter.get("/donorProfile", verifyToken, getDonorProfile);

export default donorRouter;
