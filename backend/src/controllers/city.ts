import { Request, Response } from "express";
import { City } from "../models/city";

export async function getCities(req: Request, res: Response) {
  try {
    const allCities = await City.find({});
    return res.status(200).json(allCities);
  } catch (error) {
    res.status(500).send(error);
  }
}
