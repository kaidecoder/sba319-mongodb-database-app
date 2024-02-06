import express from "express";
const router = express.Router();
import Attraction from "../models/attraction.mjs";

//create a new college  in the formNOTE: get?
router.get("/create", (req, res) => {
  res.render("createResource");
});

//add a new college
router.post("/attraction", async (req, res) => {
  try {
    const college = await Attraction.create(req.body);
    res.status(200).json(college);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//get all attractions, or get attraction by zip
router.get("/attraction", async (req, res) => {
  try {
    // Retrieve attractions based on the ZIP code (if provided)
    const zip = req.query.zip;
    const attractions = zip
      ? await Attraction.find({ zip: zip })
      : await Attraction.find();

    // Render the "attraction" page with the list of attractions
    res.render("attractions", { attractions: attractions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "attraction document not available" });
  }
});

//get one attraction - send to showpage
router.get("/attraction/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Attraction.findById(id)
    .then((result) => {
      console.log(result);
      res.render("showAttraction", { attraction: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

//delete an attraction item
router.delete("/attraction/:id", (req, res) => {
  const id = req.params.id;
  Attraction.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/attraction" });
    })
    .catch((error) => {
      console.log(error);
    });
});

//update a attraction item
router.patch("/attraction/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const attraction = await Attraction.findOneAndUpdate(
      { _id: new ObjectId(id) },
      req.body,
      { new: true },
    );
    console.log(attraction);

    res.json({ attraction });
  } catch (error) {
    console.log(error);
  }
});

export default router;
