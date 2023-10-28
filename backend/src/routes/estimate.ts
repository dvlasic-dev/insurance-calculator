import express from "express";
import {
  getAllInsuranceEstimates,
  getInsuranceEstimate,
} from "../controllers/estimate";

const estimate = express.Router();

estimate.post("/", getInsuranceEstimate);

estimate.get("/", getAllInsuranceEstimates);

export default estimate;
