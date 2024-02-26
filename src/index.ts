import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import categoriesRouter from "./routes/categories";
import instrumentsRouter from "./routes/instruments";
import homeRouter from "./routes/home";
const app = express();
const port = 5000;
dotenv.config();
app.use(cors());
app.use("/", homeRouter);
app.use("/categories", categoriesRouter);
app.use("/instruments", instrumentsRouter);

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
