import mongoose from "mongoose";
const { Schema } = mongoose;

const discountSchema = new Schema({
  name: String,
  value: Number,
  defaultState: Boolean,
});

export const Discount = mongoose.model("discounts", discountSchema);
