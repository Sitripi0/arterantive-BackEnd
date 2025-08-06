const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: { type: Date, default: Date.now }
  },

  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
