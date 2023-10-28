import express from "express";
import { getAgeGroups } from "../controllers/ageGroup";

const ageGroup = express.Router();

ageGroup.get("/", getAgeGroups);

export default ageGroup;
