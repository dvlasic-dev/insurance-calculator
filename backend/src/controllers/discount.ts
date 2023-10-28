import { Request, Response } from "express";
import { Discount } from "../models/discount";

export async function getDiscounts(req: Request, res: Response) {
  try {
    const allDiscounts = await Discount.find({});
    return res.status(200).json(allDiscounts);
  } catch (error) {
    res.status(500).send(error);
  }
}
