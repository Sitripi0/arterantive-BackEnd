const express = require("express");
const router = express.Router();

const Post = require("../models/Post.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const fileUploader = require("../config/cloudinary.config");

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("mediaUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

// POST /api/posts — Create a new post (authenticated only)
router.post("/posts", isAuthenticated, (req, res, next) => {
  const { title, date, text, typeOfPost, category,mediaUrl } = req.body;
  const userId = req.payload._id;

  Post.create({
    title,
    date,
    text,
    typeOfPost,
    category,
    authorId: userId,
    mediaUrl
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

// GET /api/posts/:postId — Get post details including populated author as user and comments with users
router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  Post.findById(postId)
    .populate({
      path: "authorId",
      select: "name",
    })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name",
      },
    })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Convert mongoose document to plain JS object
      const postObj = post.toObject();

      // Rename authorId to user for frontend convenience
      postObj.user = postObj.authorId;
      delete postObj.authorId;

      console.log("Retrieved post with populated user and comments ->", postObj);
      res.json(postObj);
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
