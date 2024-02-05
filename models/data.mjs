import mongoose from "mongoose";

const dataSchema = mongoose.Schema(
  {
    id: String,
    title: String,
    category: { label: String},
    comapany: {display_name: String},
    contract_time: String,
    created: String,
    description: String,
    location: {String},
    salary_max: Number,
    salary_min: Number,
  },
  { timestamps: true },
);

const Data = mongoose.model("Data", dataSchema);

export default Data;
