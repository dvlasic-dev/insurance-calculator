import mongoose from "mongoose";
const { Schema } = mongoose;

const estimateSchema = new Schema({
  name: String,
  brithdate: Schema.Types.Mixed,
  city: String,
  vehiclePower: Number,
  priceMatch: Number,
  voucher: Number,
  coverages: [{ name: String, value: Number }],
  discountsSurcharges: [{ name: String, value: Number }],
  basePrice: Number,
  totalPrice: Number,
  createdAt: Date,
});

export const Estimate = mongoose.model("estimates", estimateSchema);
