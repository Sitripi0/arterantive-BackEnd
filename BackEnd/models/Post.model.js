const {Schema,model} = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
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
    date: { type: Date, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post

