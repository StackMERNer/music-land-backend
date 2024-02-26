import mongoose, { Schema, Document } from "mongoose";

// Define the schema for the instrument collection
export interface Instrument extends Document {
  name: string;
  modelNumber: string;
  category: string;
  instrumentGroup: string;
  price: number;
  brand: string;
  images: string[];
  description: string;
  quantity: number;
  keywords: string[];
  specifications: {
    [key: string]: string | number;
  };
}

const instrumentSchema: Schema = new Schema({
  name: { type: String, required: true },
  modelNumber: { type: String, required: true },
  category: { type: String, required: true },
  instrumentGroup: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  images: { type: [String], default: [] },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  keywords: { type: [String], default: [] },
  specifications: { type: Schema.Types.Mixed },
});

// Create the Mongoose model
export const InstrumentModel = mongoose.model<Instrument>(
  "Instrument",
  instrumentSchema
);
