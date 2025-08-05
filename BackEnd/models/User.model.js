const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    role: {
      type: String,
      enum: ["artist","user"],
      default:"user",
    },
    bio: {type:String, required:[true, "Bio is required"]},
    profileImage : {type: String},
    socialMedia:[
      {
        platform:{type: String}, 
        URL: {type: String}
      }
    ],
    favorites:[{type : Schema.Types.ObjectId, ref:"User"}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
