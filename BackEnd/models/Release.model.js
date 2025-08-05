const { Schema, model } = require("mongoose");

const releaseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    mediaUrl: String, 
    category: { type: String, enum: ["music", "visual", "esculpture", "performance", "other"], default: "other" },
    artist: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Release = model("Release", releaseSchema);

module.exports = Release;
