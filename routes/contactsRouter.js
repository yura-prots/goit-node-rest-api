import express from "express";

import contactsControllers from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  contactFavoriteSchema,
} from "../models/Contact.js";
import {
  authenticate,
  validateBody,
  validateId,
} from "../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.get("/:id", validateId, contactsControllers.getOneContact);

contactsRouter.put(
  "/:id",
  validateId,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateId,
  validateBody(contactFavoriteSchema),
  contactsControllers.updateContact
);

contactsRouter.delete("/:id", validateId, contactsControllers.deleteContact);

export default contactsRouter;
