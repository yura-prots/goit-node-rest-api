import path from "path";
import multer from "multer";

import { HttpError } from "../helpers/index.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (_, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;

    cb(null, filename);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (_, file, cb) => {
  const extension = file.originalname.split(".").pop();
  const isImage = file.mimetype.includes("image");

  if (extension === "exe") {
    return cb(HttpError(400, "Invalid file extension"));
  }

  if (isImage) {
    return cb(null, true);
  }
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
