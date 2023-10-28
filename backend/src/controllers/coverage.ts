import { Request, Response } from "express";
import { Coverage } from "../models/coverage";

export async function getCoverages(req: Request, res: Response) {
  try {
    const allCoverages = await Coverage.find({});
    return res.status(200).json(allCoverages);
  } catch (error) {
    res.status(500).send(error);
  }
}
