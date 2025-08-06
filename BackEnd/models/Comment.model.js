const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: String,
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true }
    
  },

  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
