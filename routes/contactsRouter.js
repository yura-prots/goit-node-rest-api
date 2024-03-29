import express from "express";

import {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.put("/:id", updateContact);

export default contactsRouter;
