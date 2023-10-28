import mongoose from "mongoose";
const { Schema } = mongoose;

const citySchema = new Schema({
  name: String,
  amount: Number,
});

export const City = mongoose.model("cities", citySchema);
