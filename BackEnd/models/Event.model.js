const {Schema,model} = require("mongoose");

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    date: { type: Date, required: true },
    artist: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Event = model("Event", eventSchema);

module.exports = Event