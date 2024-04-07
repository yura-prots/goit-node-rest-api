import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";

export const register = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};
