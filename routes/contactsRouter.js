import express from "express";

import {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  contactFavoriteSchema,
} from "../models/Contact.js";
import { authenticate, validateBody, validateId } from "../helpers/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.get("/:id", validateId, getOneContact);

contactsRouter.put(
  "/:id",
  validateId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateId,
  validateBody(contactFavoriteSchema),
  updateContact
);

contactsRouter.delete("/:id", validateId, deleteContact);

export default contactsRouter;
