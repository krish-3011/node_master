import multer, { memoryStorage } from "multer";
import path from "path";
import fs from "fs"

const storage  = multer.diskStorage({
      destination: function (req, file, cb) {

    let folder = "";

    if (file.fieldname === "avatar") {
      folder = "uploads/avatars";
    } 
    else if (file.fieldname === "profile") {
      folder = "uploads/profiles";
    } 
    else if (file.fieldname === "documents") {
      folder = "uploads/documents";
    } 
    else {
      folder = "uploads/others";
    }
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
    filename: (req,file,cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); 
    }
})


export const upload = multer({ storage : memoryStorage() })