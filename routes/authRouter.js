import express from "express";

import {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
} from "../controllers/authControllers.js";
import {
  userRegisterSchema,
  userLoginSchema,
  subscriptionUpdateSchema,
} from "../models/User.js";
import { validateBody, authenticate } from "../helpers/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userRegisterSchema), register);

authRouter.post("/login", validateBody(userLoginSchema), login);

authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, getCurrent);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(subscriptionUpdateSchema),
  updateSubscription
);

export default authRouter;
