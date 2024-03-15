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
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
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
