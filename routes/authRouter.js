import express from "express";

import { register } from "../controllers/authControllers.js";
import { userRegisterSchema, userLoginSchema } from "../models/User.js";
import validateBody from "../helpers/validateBody.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userRegisterSchema), register);

export default authRouter;
