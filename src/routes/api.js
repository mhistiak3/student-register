import express from "express";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";
import { getProfileController, updateProfileController } from "../controllers/profileController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { deleteFileController, getFileController, uploadFileController } from "../controllers/fileController.js";

const router = express.Router();


// Student Register Route
router.post("/register", registerController)
router.post("/login", loginController);

// Read Profile
router.get("/profile",AuthMiddleware, getProfileController);
router.put("/update-profile", AuthMiddleware, updateProfileController);

// File Upload
router.post("/upload-file", AuthMiddleware, uploadFileController);
router.delete("/delete-file/:fileId", AuthMiddleware, deleteFileController);
router.get("/get-file/:fileId", AuthMiddleware, getFileController);



export default router