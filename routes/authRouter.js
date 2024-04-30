import express from "express";

import { validateBody, authenticate, upload } from "../middlewares/index.js";
import {
  userRegisterSchema,
  userEmailSchema,
  userLoginSchema,
  subscriptionUpdateSchema,
} from "../models/User.js";
import authControllers from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(userRegisterSchema),
  authControllers.register
);

authRouter.get("/verify/:verificationToken", authControllers.verify);

authRouter.post(
  "/verify",
  validateBody(userEmailSchema),
  authControllers.resendVerify
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

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

export default authRouter;
