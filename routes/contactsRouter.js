import express from "express";

import {
  getAllContacts,
  getOneContact,
  createContact,
  // updateContact,
  // deleteContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  // updateContactSchema,
} from "../models/Contact.js";
import validateId from "../helpers/validateId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", validateId, getOneContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

// contactsRouter.put("/:id", validateId, validateBody(updateContactSchema), updateContact);

// contactsRouter.delete("/:id", validateId, deleteContact);

export default contactsRouter;
