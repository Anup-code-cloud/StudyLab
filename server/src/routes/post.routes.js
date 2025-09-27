import express from "express";
import { getPosts, createPost } from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", protect, createPost); // only logged-in users can create posts

export default router;
