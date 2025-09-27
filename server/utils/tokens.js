// server/src/utils/tokens.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "supersecretaccess";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "supersecretrefresh";

// ✅ Generate Access Token (short-lived, e.g. 15m)
export const signAccessToken = (userId) => {
  return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

// ✅ Generate Refresh Token (long-lived, e.g. 7d)
export const signRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

// ✅ Verify Refresh Token
export const verifyRefresh = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};
