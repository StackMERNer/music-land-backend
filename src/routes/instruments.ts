import express, { Request, Response } from "express";
import { InstrumentModel } from "../models/instrument";
import { sendError, sendSuccess } from "../helpers/helpers";
import { INTERNAL_SERVER_ERROR } from "../constants/constants";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const queries = req.query;
  try {
    const instruments = await InstrumentModel.find(queries);
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
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const instruments = await InstrumentModel.findById({ _id: id });
    sendSuccess(res, instruments);
  } catch (error) {
    sendError(
      res,
      INTERNAL_SERVER_ERROR.statusCode,
      INTERNAL_SERVER_ERROR.message
    );
  }
});

export default router;
