import mongoose from "mongoose";
const { Schema } = mongoose;

const coverageSchema = new Schema({
  name: String,
  value: Schema.Types.Mixed,
  defaultState: Boolean,
});

export const Coverage = mongoose.model("coverages", coverageSchema);
