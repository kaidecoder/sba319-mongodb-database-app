import mongoose from "mongoose";

const jobListingSchema = mongoose.Schema(
  {
    id:String,
    title: String,
    category: {
      label: String
    },
    company: {
      display_name: String
    },
    contract_time: String,
    created: String,
    description: String,
    location: {String},
    salary_max: Number,
    salary_min: Number
    
  },
  { timestamps: true }
);

const JobListings = mongoose.model("JobListings", jobListingSchema);

export default JobListings;