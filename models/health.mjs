import mongoose from "mongoose";

const healthSchema = mongoose.Schema(
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
    
  },
  { timestamps: true }
);

const Health = mongoose.model("Health", healthSchema);

export default Health;