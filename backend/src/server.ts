import dotenv from "dotenv";
// Load environment variables immediately before other imports
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import habitsRoutes from "./routes/habits";

// Fast fail if JWT_SECRET is not configured
if (!process.env.JWT_SECRET) {
  console.error("❌ CRITICAL: JWT_SECRET environment variable is not defined!");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Use Helmet for secure HTTP headers
app.use(helmet());

// Global Rate Limiter: max 100 requests per 15 minutes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many requests from this IP, please try again after 15 minutes." }
});
app.use(globalLimiter);



// Enable CORS with restricted origin
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parser middleware
app.use(express.json());

// Request logger for debugging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Diagnostic route
app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    message: "Swayanshu Wellness Backend API is online.",
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use("/api/habits", habitsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Server running in developer mode on port: ${PORT}`);
  console.log(`🔗 API Root URL: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
