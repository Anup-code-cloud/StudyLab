import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./src/routes/auth.routes.js";
import postRoutes from "./src/routes/post.routes.js";
import { notFound, errorHandler } from "./src/middleware/error.js";
import { requestLimiter } from "./src/middleware/rateLimit.js";
import { env } from "./src/config/env.js";

dotenv.config();
const app = express();

// Trust proxy if behind reverse proxy (render/vercel/nginx)
app.set("trust proxy", 1);

// ✅ Middleware
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Basic rate limit (global)
app.use(requestLimiter);

// ✅ MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, { dbName: "studylab" })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Health Check
app.get("/", (req, res) => {
  res.json({
    status: "API OK 🚀",
    service: "StudyLab Backend",
    env: env.NODE_ENV,
  });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// 404 + Error Handlers
app.use(notFound);
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
