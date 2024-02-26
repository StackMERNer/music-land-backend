import express, { Request, Response } from "express";
import mongoose from "mongoose";
import categoriesRouter from "./routes/categories";
const app = express();
import dotenv from "dotenv";
const port = 5000;
app.use("/categories", categoriesRouter);

dotenv.config();
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
