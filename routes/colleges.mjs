import express from "express";
const router = express.Router();
import College from "../models/college.mjs";

router.get("/about", (req, res) => {
  res.render("about");
});

//quiz
router.get("/quiz", (req, res) => {
  res.render("quiz");
});

//trivia
router.get("/trivia", (req, res) => {
  res.render("trivia");
});

//redirect help to the college page
router.get("/help", (req, res) => {
  res.redirect("/college");
});

//create a new college  in the update form
// router.post("/create", (req, res) => {
//   res.render("create_data", { college: {} });
// });

//Get an updated college in the update form
router.get("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }
    res.render("create_data", { college: college });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch college for update" });
  }
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

//create a college in the update form
router.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCollege = await College.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.render("create_data", { college: updatedCollege });
    res.redirect("/college");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update college" });
  }
});

//create a resource
router.post("/create", (req, res) => {
  res.render("createResource", { event: {} });
});

// Update a college in the update form
router.patch("/college/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCollege = await College.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCollege) {
      return res.status(404).json({ error: "College not found" });
    }

    res.render("create_data", { college: updatedCollege });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update college" });
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

//delete a college item
router.delete("/college/:id", (req, res) => {
  const id = req.params.id;
  College.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/college" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Did not delete" });
    });
});

export default router;
