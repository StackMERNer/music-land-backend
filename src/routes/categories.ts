import express, { Request, Response } from "express";
import { InstrumentModel } from "../models/instrument"; // Import your instrument model

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // Query the database to retrieve unique instrument groups
    const instrumentGroups = await InstrumentModel.distinct(
      "instrumentGroup"
    ).exec();

    // Iterate over each instrument group to find its associated categories
    const instrumentGroupsData = await Promise.all(
      instrumentGroups.map(async (group: string) => {
        // Query the database to retrieve categories for the current instrument group
        const categories = await InstrumentModel.distinct("category", {
          instrumentGroup: group,
        }).exec();
        return { instrumentGroup: group, categories };
      })
    );

    // Respond with the instrument groups and their associated categories
    res.json(instrumentGroupsData);
  } catch (err) {
    // Handle any errors that occur during database query or response
    console.error("Error fetching instrument groups and categories:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch instrument groups and categories" });
  }
});

export default router;
