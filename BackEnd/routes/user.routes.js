const express = require("express");
const  router = express.Router();
const Comment = require("../models/Comment.model");
const {isAuthenticated} = require("../middleware/jwt.middleware")

// POST /releases/:id/comments — Comentar en un release
router.post("/releases/:id/comments",(req,res,next)=>{
    Comment.create({
     user: req.body.user,
     text: req.body.text,
     createdAt:req.body.createdAt
    })
    .then((createdComment)=>{
        res.status(201).json(createdComment);
    })
    .catch(next);
});
// DELETE /releases/:releaseId/comments/:commentId — Eliminar comentario 
router.delete("/releases/:releaseId/comments/:commentId", (req,res,next) =>{
    const {commentId} = req.params
    Comment.findByIdAndDelete(commentId)
    .then(()=>{
        res.status(204).send();
    })
    .catch(next);
});

module.exports = router;