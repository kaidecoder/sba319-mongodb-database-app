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

collegeSchema.index({ name: 1 });
collegeSchema.index({ city: 1 });
collegeSchema.index({ zip: 1 });
collegeSchema.index({ costAfterAid: 1 });
collegeSchema.index({ acceptanceRate: 1 });

collegeSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

const Colleges = mongoose.model("Colleges", collegeSchema);

export default Colleges;
