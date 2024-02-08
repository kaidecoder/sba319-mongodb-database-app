import Health from "../models/health.mjs";
import express from "express";
const router = express.Router();

//create a health document
router.post("/health", async (req, res) => {
  try {
    const health = await Health.create(req.body);
    res.status(200).json(health);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//get all health, or get health by zip
// http://localhost:3000/health?zip=02124
router.get("/health", async (req, res) => {
  try {
    // Retrieve health based on the ZIP code (if provided)
    const zip = req.query.zip;
    const health = zip ? await Health.find({ zip: zip }) : await Health.find();

    // Render the "health  page with the list of health
    res.render("health", { health: health });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "health document not available" });
  }
});

//get one health - send to showpage
router.get("/health/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Health.findById(id)
    .then((result) => {
      console.log(result);
      res.render("showHealth", { health: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

//delete a health item
router.delete("/health/:id", (req, res) => {
  const id = req.params.id;
  Health.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/health" });
    })
    .catch((error) => {
      console.log(error);
    });
});

//update a health item
router.patch("/health/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const health = await Health.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    console.log(health);

    res.json({ health });
  } catch (error) {
    console.log(error);
  }
});

export default router;
