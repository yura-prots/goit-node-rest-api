import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", preUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  password: Joi.string().required().min(6).messages({
    "any.required": `"password" is a required field`,
    "string.empty": `"password" cannot be an empty field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
  }),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "any.required": `"email" is a required field`,
      "string.empty": `"email" cannot be an empty field`,
    }),
  subscription: Joi.string(),
  token: Joi.string(),
});

const User = model("user", userSchema);

export default User;
