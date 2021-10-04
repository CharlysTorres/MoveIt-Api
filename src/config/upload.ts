import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
}

// destination: path.join(__dirname, '..', '..', 'uploads'),
//   storage: multer.diskStorage({
//     destination: (request, file, callback) => {
//       callback(null, path.join(__dirname, '..', '..', 'uploads'))
//     },
//     filename: (request, file, callback) => {
//       const fileName = `${Date.now()}-${file.originalname}`;
      
//       callback(null, fileName);
//     },
//   }),
//   limits: {
//     fileSize: 2 * 1024 * 1024
//   },
//   fileFilter: (request, file, callback) => {
//     const allowedMimes = [
//       "images/jpeg",
//       "images/jpg",
//       "images/png",
//       "images/gif"
//     ];

//     if (allowedMimes.includes(file.mimetype)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Invalid file type"));
//     }
//   }

// const storageTypes = {
//   local: multer.diskStorage({
//     destination: (request, file, callback) => {
//       callback(null, path.join(__dirname, '..', '..', 'uploads'));
//     },
//     filename: (request, file, callback) => {
//       const fileName = `${Date.now()}-${file.originalname}`;

//       callback(null, fileName);
//     }
//   }),
// };