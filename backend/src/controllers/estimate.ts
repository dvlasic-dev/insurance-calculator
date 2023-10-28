import { Request, Response } from "express";
import { Estimate } from "../models/estimate";
import { calculateEstimate } from "../utils/helpers";

export async function getInsuranceEstimate(req: Request, res: Response) {
  try {
    const data = req.body;
    const priceDetails = await calculateEstimate(data);
    console.log(data, priceDetails);
    // save pricedetails to db
    const createdAt = new Date();
    const savedEstimate = await Estimate.create({ ...priceDetails, createdAt });
    console.log(savedEstimate);

    return res.status(200).json(priceDetails);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function getAllInsuranceEstimates(req: Request, res: Response) {
  try {
    const allEstimates = await Estimate.find({}).sort({ createdAt: "desc" });

    return res.status(200).json(allEstimates);
  } catch (error) {
    res.status(500).send(error);
  }
}
