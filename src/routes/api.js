import express from "express";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";
import { getProfileController, updateProfileController } from "../controllers/profileController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();


// Student Register Route
router.post("/register", registerController)
router.post("/login", loginController);

// Read Profile
router.get("/profile",AuthMiddleware, getProfileController);
router.put("/update-profile", AuthMiddleware, updateProfileController);



export default router