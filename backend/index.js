import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import donorRouter from "./routes/donorRoutes.js";
import receiverRouter from "./routes/receiverRoutes.js";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
connectDb();

app.use("/api/auth",authRouter);
app.use("/api/donor", donorRouter);
app.use("/api/receiver",receiverRouter)
app.listen(PORT, () => {
  console.log(`Serving on port :${PORT}`);
});
