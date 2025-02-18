// const express = require("express"); CJS
import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db";
import router from "./router";

const app = express();
connectDB();

//express middleware part
app.use(express.json());

app.use(router); // configuramos, es como un setter

export default app; // exportamos ya seteado para usarlo
