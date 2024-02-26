import express, { Request, Response } from "express";
import { InstrumentModel } from "../models/instrument";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const queries = req.query;
  try {
    const instruments = await InstrumentModel.find(queries);
    // console.log(queries);
    // console.log(instruments.length);
    res.send({ results: instruments });
  } catch (error) {
    console.error(
      "Error fetching instrument groups and sub categories:",
      error
    );
    res.status(500).json({
      message: "Failed to fetch Instruments",
    });
  }
});

export default router;
