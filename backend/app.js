import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import { isDBConnected } from "./config/db.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Rate limit the public inquiry submission endpoint to prevent abuse/spam
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api/inquiry", (req, res, next) => (req.method === "POST" ? inquiryLimiter(req, res, next) : next()));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    db: isDBConnected() ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/inquiry", inquiryRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error("[unhandled]", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
