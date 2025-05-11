import express from "express";
import {getUser, login, logout, register, updatePassword, updateProfile} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);



// router.get("/getuser", isAuthenticated, getUser); // also need to modify in postman --- done


export default router;