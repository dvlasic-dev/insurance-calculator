import mongoose from "mongoose";
const { Schema } = mongoose;

const ageGroupSchema = new Schema(
  {
    age: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { collection: "ageGroups", required: true }
);
//added collection property to Schema because monogoose defaults to lowercase

export const AgeGroup = mongoose.model("ageGroups", ageGroupSchema);
