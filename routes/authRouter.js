import express from "express";

import { register, login, getCurrent } from "../controllers/authControllers.js";
import { userRegisterSchema, userLoginSchema } from "../models/User.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../helpers/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userRegisterSchema), register);

authRouter.post("/login", validateBody(userLoginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

export default authRouter;
