const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST api/posts/:id/comments — Add a comment to a post
router.post("/posts/:id/comments", isAuthenticated, async (req, res, next) => {
  const { id: postId } = req.params;
  const { text } = req.body;
  const userId = req.payload._id;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    const createdComment = await Comment.create({
      user: userId,
      text,
      post: postId,
    });

    // Add the comment reference to the post
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: createdComment._id },
    });

    // Populate the user field in the created comment before sending response
    await createdComment.populate({
      path: "user",
      select: "username name",
    });

    res.status(201).json(createdComment);
  } catch (error) {
    next(error);
  }
});

// DELETE api/posts/:postId/comments/:commentId — Delete a comment
router.delete(
  "/posts/:postId/comments/:commentId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { commentId, postId } = req.params;
      const userId = req.payload._id;

      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (comment.user.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this comment" });
      }

      await Comment.findByIdAndDelete(commentId);

      // Remove comment reference from the post
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: commentId },
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

// GET api/posts/:postId — Get post with populated comments and their users
router.get("/posts/:postId", async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username name",
        },
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
