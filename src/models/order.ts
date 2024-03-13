import mongoose from "mongoose";

const addedItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  image: { type: String, required: true },
});

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: String,
        phone: String,
        email: String,
      }),
      required: true,
    },
    cart: {
      type: [addedItemSchema],
      required: true,
    },
  })
);

export default Order;
