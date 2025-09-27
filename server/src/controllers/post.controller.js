import Post from "../models/Post.js"; // exact case and .js extension

// Get all posts
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// Create a post
export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ user: req.user._id, title, content });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};
