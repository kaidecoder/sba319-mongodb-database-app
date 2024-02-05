import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://nwasporter70:6HivhNQ38W2Ch4wA@cluster0.da2gegj.mongodb.net/HelpBostonians?retryWrites=true&w=majority",
  )
  .then(() => {
    console.log("db connection successful");
  })
  .catch((error) => {
    console.log("something went wrong", error);
  });
