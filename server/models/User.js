const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const dateFormat = require("../utils/dateFormat")
const postSchema = require("./Post")

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },

  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('postCount').get(function () {
  return this.post.length
});




const User = model("User", userSchema);

module.exports = User;
