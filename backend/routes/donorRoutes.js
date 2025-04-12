import express from "express";
import { editDonorProfile,donorRequest,getDonorRequests } from "../controllers/donorController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const donorRouter = express.Router();

// donorRouter.use(verifyToken); // Apply token verification middleware to all routes in this router
donorRouter.post("/edit-profile", verifyToken,editDonorProfile); // Edit donor profile
donorRouter.post("/donor-request", verifyToken,donorRequest); // Create a new request
donorRouter.get("/donor-requests/:donorId",verifyToken, getDonorRequests); // Get all requests made by a donor

export default donorRouter;