import express from "express";
const router = express.Router();
import College from "../models/college.mjs";
import { ObjectId } from "mongodb";

// router.get("/help", (req, res) => {
//   render an image here maybe
// })

//create a new college  in the formNOTE: get?
router.get("/create", (req, res) => {
  res.render("createResource");
});

//add a new college
router.post("/college", async (req, res) => {
  try {
    const college = await College.create(req.body);
    res.status(200).json(college);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//get all colleges, or get college by zip
router.get("/college", async (req, res) => {
  try {
    // Retrieve college based on the ZIP code (if provided)
    const zip = req.query.zip;
    const colleges = zip
      ? await College.find({ zip: zip })
      : await College.find();

    // Render the "college" page with the list of colleges
    res.render("colleges", { colleges: colleges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "college document not available" });
  }
});

//get one college - send to showpage
router.get("/college/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await College.findById(id)
    .then((result) => {
      console.log(result);
      res.render("showCollege", { college: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

//get one college - send to showpage
router.get("/college/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await College.findById(id)
    .then((result) => {
      console.log(result);
      res.render("showPage", { college: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

//delete a college item
router.delete("/college/:id", (req, res) => {
  const id = req.params.id;
  College.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/college" });
    })
    .catch((error) => {
      console.log(error);
    });
});

//update a college item
router.patch("/college/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const college = await College.findOneAndUpdate(
      { _id: new ObjectId(id) },
      req.body,
      { new: true }
    );
    console.log(college);

    res.json({ college });
  } catch (error) {
    console.log(error);
  }
});

export default router;
