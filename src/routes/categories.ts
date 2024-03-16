import express, { Request, Response } from "express";
import { InstrumentModel } from "../models/instrument";
import { sendError, sendSuccess } from "../helpers/helpers";
import { INTERNAL_SERVER_ERROR } from "../constants/constants";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const categoryNames = await InstrumentModel.distinct("category").exec();

    const instrumentGroupsData = await Promise.all(
      categoryNames.map(async (category: string) => {
        const subCategories = await InstrumentModel.distinct("subCategory", {
          category: category,
        }).exec();
        return { category, subCategories };
      })
    );
    sendSuccess(res, instrumentGroupsData);
  } catch (err) {
    sendError(
      res,
      INTERNAL_SERVER_ERROR.statusCode,
      INTERNAL_SERVER_ERROR.message
    );
  }
});

export default router;
