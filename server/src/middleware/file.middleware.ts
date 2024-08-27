import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { HttpError } from './error.middleware';
import { HttpStatus } from '../types';
// Configure file storage with multer
const storage = (dest: string) => multer.diskStorage({
  // Specify the directory where files should be stored
  destination(req: any, file: any, cb: (arg0: null, arg1: string) => void) {
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  // Specify how files should be named
  filename(req: any, file: { fieldname: any; originalname: any; }, cb: (arg0: null, arg1: string) => void) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// TODO: Need to convert types and mimes to enum contain them
const checkWordFileTypes = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileType = /\.(docx|doc)$/i; // Updated regular expression
  const extname = fileType.test(path.extname(file.originalname));
  const mimetype = /^application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document$/i.test(file.mimetype)
  || /^application\/msword$/i.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb(new HttpError('Supported file types are doc and docx', HttpStatus.BAD_REQUEST));
};

const checkExcelFileTypes = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileType = /\.(xlsx|xls|csv)$/i; // Updated regular expression
  const extname = fileType.test(path.extname(file.originalname));
  const mimetype = /^application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet$/i.test(file.mimetype)
  || /^application\/vnd\.ms-excel$/i.test(file.mimetype)
  || /^text\/csv$/i.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb(new HttpError('Supported file types are xlsx, xls, and csv ', HttpStatus.BAD_REQUEST));
};

const checkCommonFileTypes = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileType = /\.(docx|doc|xlsx|xls|csv|txt|json|ppt|pptx|pdf|zip|7z)$/i; // Updated regular expression
  const extname = fileType.test(path.extname(file.originalname));
  const mimetype = /^application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document$/i.test(file.mimetype)
     || /^application\/msword$/i.test(file.mimetype)
     || /^application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet$/i.test(file.mimetype)
     || /^application\/vnd\.ms-excel$/i.test(file.mimetype)
     || /^text\/csv$/i.test(file.mimetype)
     || /^application\/vnd\.ms-powerpoint$/i.test(file.mimetype)
     || /^application\/vnd\.openxmlformats-officedocument\.presentationml\.presentation$/i.test(file.mimetype)
     || /^text\/plain$/i.test(file.mimetype)
     || /^application\/json$/i.test(file.mimetype)
     || /^application\/pdf$/i.test(file.mimetype)
     || /^application\/zip$/i.test(file.mimetype)
     || /^application\/x-7z-compressed$/i.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb(new HttpError('Supported file types are docx, doc, xlsx, xls, csv, txt, json, ppt, pptx, pdf, zip, 7z', HttpStatus.BAD_REQUEST));
};

const checkImageTypes = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const fileType = /jpg|png|jpeg/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  // Call the callback with null and true to indicate that the file is acceptable
  const mimetype = /^image\/(jpeg|png|jpeg)$/i.test(file.mimetype);
  if (extname && mimetype) return cb(null, true);
  // Call the callback with an error to indicate that the file is not acceptable
  return cb(new HttpError('Supported file types are png, jpg, and jepg', HttpStatus.BAD_REQUEST));
};

// NOTE: Unneeded
const checkAllFileTypes = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileType = /\.(jpg|png|jpeg|docx|doc|xlsx|xls|csv|txt|json|ppt|pptx|pdf|zip|7z)$/i; // Updated regular expression
  const extname = fileType.test(path.extname(file.originalname));
  const mimetype = /^image\/(jpeg|png)$/i.test(file.mimetype)
     || /^application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document$/i.test(file.mimetype)
     || /^application\/msword$/i.test(file.mimetype)
     || /^application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet$/i.test(file.mimetype)
     || /^application\/vnd\.ms-excel$/i.test(file.mimetype)
     || /^text\/csv$/i.test(file.mimetype)
     || /^application\/vnd\.ms-powerpoint$/i.test(file.mimetype)
     || /^application\/vnd\.openxmlformats-officedocument\.presentationml\.presentation$/i.test(file.mimetype)
     || /^text\/plain$/i.test(file.mimetype)
     || /^application\/json$/i.test(file.mimetype)
     || /^application\/pdf$/i.test(file.mimetype)
     || /^application\/zip$/i.test(file.mimetype)
     || /^application\/x-7z-compressed$/i.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb(new HttpError('Supported file types are docx, doc, xlsx, xls, csv, txt, json, ppt, pptx, pdf, zip, 7z', HttpStatus.BAD_REQUEST));
};

// NOTE: Unneeded
// Configure multer to handle file uploads with the specified storage and file filter
const upload = multer({
  storage: storage('public/reportImages'),
  fileFilter: (_req: any, file: any, cb: any) => {
    // Use the checkFileType function to filter out unacceptable files
    checkAllFileTypes(file, cb);
  },
});

export const uploadImages = (dest: string) => {
  const uploadObj = multer({
    storage: storage(`public/${dest}`),
    fileFilter: (_req: any, file: any, cb: any) => {
      checkImageTypes(file, cb);
    },
  });
  return uploadObj;
};

export const uploadImagesPng = (dest: string) => {
  const uploadObj = multer({
    storage: storage(`public/${dest}`),
    fileFilter: (_req: any, file: any, cb: any) => {
      checkImageTypes(file, cb);
    },
  });
 return uploadObj;
};



export const uploadDoc = (dest: string) => {
  const uploadObj = multer({
    storage: storage(`public/${dest}`),
    fileFilter: (_req: any, file: any, cb: any) => {
      checkWordFileTypes(file, cb);
    },
  });

  return uploadObj;
};

export const uploadSheet = (dest: string) => {
  const uploadObj = multer({
    storage: storage(`public/${dest}`),
    fileFilter: (_req: any, file: any, cb: any) => {
      checkExcelFileTypes(file, cb);
    },
  });

  return uploadObj;
};

export const uploadCommon = (dest: string) => {
  const uploadObj = multer({
    storage: storage(`public/${dest}`),
    fileFilter: (_req: any, file: any, cb: any) => {
      checkCommonFileTypes(file, cb);
    },
  });

  return uploadObj;
};

export default upload;
