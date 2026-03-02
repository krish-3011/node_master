import { Router } from "express";
import { upload } from "../config/multer.config.js";
import cloudinary from "../config/cloudinary.config.js";



const fileRouter = Router();

// fileRouter.post("/upload", upload.single ("file"), (req,res) => {
//     res.status(200).json({success : true , message : "file uploaded successfully" , data : req.file})
// })



fileRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "myapp" },
      (error, result) => {
        if (error) return res.status(500).json(error);
        res.json({
          message: "Uploaded to Cloudinary",
          url: result.secure_url
        });
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

fileRouter.post("/multiple-fields", upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "profile", maxCount: 1 },
    { name: "documents", maxCount: 5 }
]), (req,res) => {
    res.status(200).json({success : true , message : "files uploaded successfully" , data : req.files})
})

export default fileRouter