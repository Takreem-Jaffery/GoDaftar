import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {connection} from './database/connection.js';
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({path: "./config/config.env"});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser()); // access the user after registration
app.use(express.json());
app.use(express.urlencoded({extended: true})); // what kind of data we're getting

connection();
app.use(errorMiddleware);

export default app;