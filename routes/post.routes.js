const express = require("express");
const router = express.Router();

const Post = require("../models/Post.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST /api/posts — Create a new post (authenticated only)
router.post("/posts", isAuthenticated, (req, res, next) => {
  const { title, date, text, typeOfPost, category } = req.body;
  const userId = req.payload._id;

  Post.create({
    title,
    date,
    text,
    typeOfPost,
    category,
    authorId: userId,
  })
    .then((createdPost) => res.status(201).json(createdPost))
    .catch(next);
});

// GET /api/posts — List all posts
router.get("/posts", (req, res, next) => {
  Post.find({})
    .then((posts) => {
      console.log("Retrieved posts ->", posts);
      res.json(posts);
    })
    .catch(next);
});

// GET /api/posts/:postId — Get post details including populated comments and users
router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .populate({
      path: "comments", // populate the comments array
      populate: {
        path: "user",     // for each comment, populate the 'user'
        select: "name", // only include the username
      },
    })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      console.log("Retrieved post with comments ->", post);
      res.json(post);
    })
    .catch(next);
});

// PUT /api/posts/:postId — Edit a post (authenticated/owner only)
router.put("/posts/:postId", isAuthenticated, async (req, res, next) => {
  const { postId } = req.params;
  const updateData = req.body;
  const userId = req.payload._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to edit this post" });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/posts/:postId — Delete a post (authenticated/owner only)
router.delete("/posts/:postId", isAuthenticated, async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.payload._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
