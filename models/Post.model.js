const {Schema,model} = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: false },
    typeOfPost: {
      type: String,
      enum: ["release", "event"] 
    },
    mediaUrl: String, 
    category: { 
      type: String, 
      enum: ["music", "visual", "esculpture", "performance", "other"], 
      default: "other" 
    },
    location: String,
    date: { type: Date},
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    imageUrl: String,
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post

