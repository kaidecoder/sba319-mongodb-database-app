import express from "express";
const router = express.Router()
import mongoose from "mongoose";
// import("./db/mongoose.mjs");
import Data from "../models/data.mjs"


router.post("/data", async (req, res) => {
  try {
    const receivedData = req.body.apiData;
    console.log(receivedData)
    // Assuming receivedData is an array of objects with name and value properties
    // Loop through the array and save each object to the database
    for (const dataItem of receivedData) {
      await Data.create(dataItem);
    }

    console.log("Data saved successfully");
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

