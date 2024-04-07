import { isValidObjectId } from "mongoose";
import { HttpError } from "./index.js";

const validateId = (req, _, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} is not valid id`));
  }

  next();
};

export default validateId;
