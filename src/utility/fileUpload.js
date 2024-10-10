import  path  from "path";
import multer from "multer";

// image upload Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = file.originalname
      .replace(fileExt, "")
      .toLowerCase()
      .split(" ")
      .join("-");
    const uniqName = `${Date.now()}-${fileName + fileExt}`;
    cb(null, uniqName);
  },
});

export const uploadFile = multer({
  storage,
  limits: {
    fileSize: 1000000 * 5, // 5MB
  },
}).single("file");
