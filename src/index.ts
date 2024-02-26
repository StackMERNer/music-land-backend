// import cors from "cors";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import categoriesRouter from "./routes/categories";
import instrumentsRoute from "./routes/instruments";
const app = express();
const port = 5000;
dotenv.config();
app.use(cors());

app.use("/categories", categoriesRouter);
app.use("/instruments", instrumentsRoute);
// Middleware function to log incoming requests

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
