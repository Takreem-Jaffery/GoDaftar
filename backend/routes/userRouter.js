import express from "express";
import {register} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);

// router.get("/getuser", isAuthenticated, getUser); // also need to modify in postman


export default router;