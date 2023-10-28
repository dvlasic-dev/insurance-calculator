import { Request, Response } from "express";
import { AgeGroup } from "../models/ageGroup";

export async function getAgeGroups(req: Request, res: Response) {
  try {
    const allAgeGroups = await AgeGroup.find({});
    return res.status(200).json(allAgeGroups);
  } catch (error) {
    res.status(500).send(error);
  }
}
