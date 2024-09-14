import express from "express";
import authRoutes from "./route/authRoutes.js";
import eventRoutes from "./route/eventRoutes.js";
import userRoute from "./route/userRoutes.js"
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors"
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv"


const app = express();

app.use(cors({
  origin: 'https://hackathon-frontend-two.vercel.app', // Specify the allowed origin
  credentials: true // If you need to allow credentials
}));

dotenv.config();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Testing
app.get("/", (req, res) => {
  res.send("Healthy");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/all-users", userRoute)


// Error Handler
app.use(errorHandler);

export default app;
