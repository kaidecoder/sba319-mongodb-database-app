import express from "express";
import mongoose from "mongoose";
import("./db/mongoose.mjs");
const app = express();
import collegeRouter from "./routes/colleges.mjs";
import attractionRouter from "./routes/attractions.mjs";
import morgan from "morgan";
import bodyParser from "body-parser";
import healthRouter from "./routes/health.mjs";

//view engine
app.set("view engine", "ejs");

app.use(morgan("dev"));
// app.use(express.json())
// app.use(express.urlencoded( {extended: true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./styles"));
app.use(express.static("./images"));

app.use(collegeRouter);
app.use(attractionRouter);
app.use(healthRouter);

//NOTE:  Set up the 404 Page
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

app.listen(3000, (req, res) => {
  console.log("app running on port 3000");
});
