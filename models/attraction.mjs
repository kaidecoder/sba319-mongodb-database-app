import mongoose from "mongoose";

const attractionSchema = mongoose.Schema(
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
    
  },
  { timestamps: true }
);

const Attractions = mongoose.model("Attractions", attractionSchema);

export default Attractions;
