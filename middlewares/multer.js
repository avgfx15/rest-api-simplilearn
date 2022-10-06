const path = require("path");
const multer = require("multer");

module.exports = (folderName) => {
  return multer({
    fileFilter: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      if (
        extension !== ".png" &&
        extension !== ".jpg" &&
        extension !== ".jpeg" &&
        extension !== ".gif" &&
        extension !== ".webp"
      ) {
        return cb(new Error("Only images are allow"));
      }
      cb(null, true);
    },
    dest: `public/uploads/${folderName}/`,
  });
};
