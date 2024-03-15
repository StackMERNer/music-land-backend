import express, { Request, Response } from "express";
import Order from "../models/order";
import { sendError, sendSuccess } from "../helpers/helpers";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/constants";
const router = express.Router();
import mongoose from "mongoose";

router.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  // console.log(userId);
  try {
    const orders = await Order.find({ "customer.id": userId });
    // console.log(orders);
    sendSuccess(res, orders);
  } catch (error) {
    sendError(
      res,
      INTERNAL_SERVER_ERROR.statusCode,
      INTERNAL_SERVER_ERROR.message
    );
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    let order = new Order(req.body);
    const response = await order.save();
    sendSuccess(res, response);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      sendError(res, BAD_REQUEST.statusCode, error.message);
    } else {
      sendError(
        res,
        INTERNAL_SERVER_ERROR.statusCode,
        INTERNAL_SERVER_ERROR.message
      );
    }
  }
});

export default router;
