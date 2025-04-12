import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../../ERP/backend/config/db.js";
import authRouter from "./routes/authRoutes.js";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();
app.use("/api/auth",authRouter);

app.listen(PORT, () => {
  console.log(`Serving on port :${PORT}`);
});
