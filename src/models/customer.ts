import mongoose from "mongoose";
import Joi from "joi";
const customerSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 30,
  },
  address: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
});

export function validateCustomer(customer: any) {
  const schema = Joi.object({
    uid: Joi.string(),
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(5).max(30).required(),
    address: Joi.string().min(10).max(100).required(),
  });
  return schema.validate(customer);
}
export const Customer = mongoose.model("Customer", customerSchema);
