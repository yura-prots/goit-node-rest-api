import Contact from "../models/Contact.js";
import HttpError from "../helpers/HttpError.js";

// import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const result = await Contact.find();

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
    const result = await Contact.create(req.body);

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
    const result = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// export const deleteContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contactsService.removeContactById(id);

//     if (!result) {
//       throw HttpError(404, `Contact with id=${id} not found`);
//     }

//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
