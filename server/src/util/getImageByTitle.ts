import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/reportImages');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const isFileTypeValid = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const fileType = /jpg|png|jpeg/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileType.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  return cb(new Error('Valid file types are jpg, png, or jpeg'));
};

const getFileByTitle = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    isFileTypeValid(file, cb);
  },
});

export default getFileByTitle;
