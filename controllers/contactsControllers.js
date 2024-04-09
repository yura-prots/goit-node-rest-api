import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { id } = req.params;
    const result = await Contact.findOneAndUpdate({ _id: id }, req.body);

    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
