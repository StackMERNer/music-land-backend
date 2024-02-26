import express, { Request, Response } from "express";
import { InstrumentModel } from "../models/instrument"; // Import your instrument model

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // Query the database to retrieve unique instrument groups
    const categoryNames = await InstrumentModel.distinct("category").exec();

    // Iterate over each instrument category to find its associated sub categories
    const instrumentGroupsData = await Promise.all(
      categoryNames.map(async (category: string) => {
        // Query the database to retrieve sub categories for the current instrument category
        const subCategories = await InstrumentModel.distinct("subCategory", {
          category: category,
        }).exec();
        return { category, subCategories };
      })
    );

    // Respond with the instrument groups and their associated sub categories
    res.json({ results: instrumentGroupsData });
  } catch (err) {
    // Handle any errors that occur during database query or response
    console.error("Error fetching instrument groups and sub categories:", err);
    res.status(500).json({
      message: "Failed to fetch instrument groups and sub categories",
    });
  }
});

export default router;
