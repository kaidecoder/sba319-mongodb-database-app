import mongoose from "mongoose";

mongoose
  .connect(
    process.env.DB_URI
  )
  .then(() => {
    console.log("db connection successful");
  })
  .catch((error) => {
    console.log("something went wrong", error);
  });
