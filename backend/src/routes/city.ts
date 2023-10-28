import express from "express";
import { getCities } from "../controllers/city";

const city = express.Router();

city.get("/", getCities);

export default city;
