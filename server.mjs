import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import("./db/mongoose.mjs");
const app = express();
import collegeRouter from "./routes/colleges.mjs";
import attractionRouter from "./routes/attractions.mjs";
import morgan from "morgan";
import healthRouter from "./routes/health.mjs";

const PORT = process.env.PORT || 3000

//view engine
app.set("view engine", "ejs");

//node middleware
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded( {extended: true}))

//static middleware
app.use(express.static("./styles"));
app.use(express.static("./images"));

//router middleware
app.use(collegeRouter);
app.use(attractionRouter);
app.use(healthRouter);

//Set up the 404 Page
app.use((req, res, next) => {
    const error = new Error("Not found");
    //error.status is correct
    error.status = 404;
    //forward the request and attach the error msg
    res.render("404");
    next(error);
  });
  
  //this handles all kinds of errors, not just 404
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

app.listen(PORT, (req, res) => {
  console.log(`app running on PORT ${PORT}`);
});
