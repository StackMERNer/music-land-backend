import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import categoriesRouter from "./routes/categories";
import homeRouter from "./routes/home";
import instrumentsRouter from "./routes/instruments";
import ordersRouter from "./routes/orders";
import customersRouter from "./routes/customers";
const app = express();
const port = 5000;
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/", homeRouter);
app.use("/categories", categoriesRouter);
app.use("/instruments", instrumentsRouter);
app.use("/orders", ordersRouter);
app.use("/customers", customersRouter);

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
