import express from "express";
import {isAuthenticated} from "../middlewares/auth.js"
import { postJob } from "../controllers/jobController";


const router = express.Router();

router.post("/post",isAuthenticated, isAuthorized(""),postJob)