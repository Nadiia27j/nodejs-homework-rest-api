const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null
    },
    avatarURL: {
      type: String,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const joiAuthSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required()
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiAuthSchema
};
