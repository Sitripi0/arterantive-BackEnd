const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment.model");
const { isAuthenticated } = require("../middleware/jwt.middleware")

// POST api/posts/:id/comments — Comentar en un release
router.post("/posts/:id/comments", isAuthenticated, (req, res, next) => {
  const { id: postId } = req.params;
  const { text } = req.body;
  const userId = req.payload._id;

  Comment.create({
    user: userId,
    text,
    post: postId
  })
    .then((createdComment) => res.status(201).json(createdComment))
    .catch(next);
});
// DELETE api/posts/:postId/comments/:commentId — Eliminar comentario 
router.delete("/posts/:postId/comments/:commentId", isAuthenticated, (req, res, next) => {
    const { commentId } = req.params;
     const userId = req.payload._id;
    Comment.findByIdAndDelete(commentId)
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
});

module.exports = router;