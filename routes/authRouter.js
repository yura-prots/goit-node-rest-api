import express from "express";

import { register, login } from "../controllers/authControllers.js";
import { userRegisterSchema, userLoginSchema } from "../models/User.js";
import validateBody from "../helpers/validateBody.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userRegisterSchema), register);

authRouter.post("/login", validateBody(userLoginSchema), login);

export default authRouter;
