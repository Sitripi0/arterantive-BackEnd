const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model")
const { isAuthenticated } = require("../middleware/jwt.middleware")

// POST /api/posts — Crea un nuevo post (solo authenticated)
router.post("/posts", isAuthenticated, (req, res, next) => {
    const { title, date, text,typeOfPost,category } = req.body;
    const userId = req.payload._id;

    Post.create({
        title,
        date,
        text,
        typeOfPost,
        category,
        authorId: userId
    })
        .then(createdPost => res.status(201).json(createdPost))
        .catch(next);
});

// GET /api/posts — Lista todos los posts
router.get("/posts", (req, res, next) => {
    Post.find({})
        .then((posts) => {
            console.log("Retrieved students ->", posts);
            res.json(posts);
        })
        .catch(next);
});

// GET /posts/:postId — Ver detalle de un post
router.get("/posts/:postId", (req, res, next) => {
    const { postId } = req.params;
    Post.findById(postId)
        .then((post) => {
            console.log("Retrieved post ->", post);
            res.json(post);
        })
        .catch(next);
});

// PUT /posts/:id — Editar un post (solo auth/owner)
router.put("/posts/:postId", isAuthenticated, (req, res, next) => {
    const { postId } = req.params;
    const updateData = req.body;

    Post.findByIdAndUpdate(postId, updateData, { new: true })
        .then((updatedPost) => {
            console.log("Post Updated ->", updatedPost);
            res.json(updatedPost);
        })
        .catch(next);
});

// DELETE /posts/:postId — Eliminar un post (solo Auth/owner)
router.delete("/posts/:postId", isAuthenticated, (req, res, next) => {
    const { postId } = req.params;
    const userId = req.payload._id;
    Post.findByIdAndDelete(postId)
        .then(() => {
            res.status(204).send();
        })
        .catch(next);
});

module.exports = router;

