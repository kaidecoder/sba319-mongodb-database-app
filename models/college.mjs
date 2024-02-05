import mongoose from "mongoose";

const collegeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    webpage: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    years: {
      type: String,
      required: true,
    },
    costAfterAid: {
      type: String,
    },
    graduationRate: {
      type: String,
    },
    acceptanceRate: {
      type: String,
    },
    sportingAffiliations: {
      type: String,
    },
  },
  { timestamps: true },
);

const Colleges = mongoose.model("Colleges", collegeSchema);

export default Colleges;
