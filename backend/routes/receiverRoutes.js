import express from "express";
import { getTotalRequests,getTotalDonors ,getAllRequests,acceptRequest, getPickupHistory} from "../controllers/receiverController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const receiverRouter = express.Router();
receiverRouter.get('/total-requests',verifyToken,getTotalRequests);
receiverRouter.get('/total-donors',verifyToken,getTotalDonors);
receiverRouter.get('/requests',verifyToken,getAllRequests);
receiverRouter.post('/accept-request/:requestId',verifyToken, acceptRequest);
receiverRouter.get('/pickup-history',verifyToken, getPickupHistory);
export default receiverRouter;