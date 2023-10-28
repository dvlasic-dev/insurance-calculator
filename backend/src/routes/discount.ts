import express from "express";
import { getDiscounts } from "../controllers/discount";

const discount = express.Router();

discount.get("/", getDiscounts);

export default discount;
