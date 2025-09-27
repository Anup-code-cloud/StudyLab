import rateLimit from "express-rate-limit";

export const requestLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,            // 120 req/min
  standardHeaders: true,
  legacyHeaders: false,
});
