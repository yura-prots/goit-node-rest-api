import express from "express";

import { validateBody, authenticate } from "../helpers/index.js";
import {
  userRegisterSchema,
  userLoginSchema,
  subscriptionUpdateSchema,
} from "../models/User.js";
import authControllers from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userRegisterSchema),
  authControllers.register
);

authRouter.post("/login", validateBody(userLoginSchema), authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(subscriptionUpdateSchema),
  authControllers.updateSubscription
);

export default authRouter;
