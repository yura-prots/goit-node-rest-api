import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";

const SECRET = process.env.JWT_SECRET;

const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" && token === null) {
    throw HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// const authenticate = async (req, res, next) => {
//   try {
//     const { authorization } = req.headers;
//     const [bearer, token] = authorization.split(" ");
//     if (bearer !== "Bearer" || token === null) {
//       throw HttpError(401, "Not authorized");
//     }

//     try {
//       const { id } = jwt.verify(token, SECRET);
//       const user = await User.findById(id);
//       if (!user || !user.token || user.token !== token) {
//         throw HttpError(401, "Not authorized");
//       }

//       req.user = user;
//       next();
//     } catch (error) {
//       throw HttpError(401, error.message);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export default authenticate;
