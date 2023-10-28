import express from "express";
import { getCoverages } from "../controllers/coverage";

const coverage = express.Router();

coverage.get("/", getCoverages);

export default coverage;
